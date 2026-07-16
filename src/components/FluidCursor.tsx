import { useEffect, useRef } from 'react'

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const SPLAT_FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_target;
  uniform float u_radius;
  uniform vec3 u_color;
  uniform vec2 u_resolution;
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float dist = distance(gl_FragCoord.xy, u_target);
    float strength = exp(-dist * dist / (u_radius * u_radius));
    gl_FragColor = vec4(u_color * strength, strength);
  }
`

const ADVECT_FRAGMENT_SHADER = `
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform float u_decay;
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec4 color = texture2D(u_texture, uv);
    gl_FragColor = color * u_decay;
  }
`

const DISPLAY_FRAGMENT_SHADER = `
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec4 color = texture2D(u_texture, uv);
    float intensity = clamp(color.r + color.g + color.b, 0.0, 1.0);
    vec3 tint = vec3(0.6, 0.4, 0.9);
    gl_FragColor = vec4(tint * intensity * 1.5, intensity * 0.7);
  }
`

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram | null {
  const vs = createShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  if (!vs || !fs) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }
  return program
}

export function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    })
    if (!gl) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    window.addEventListener('resize', resize)
    resize()

    const quadBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const splatProgram = createProgram(gl, VERTEX_SHADER, SPLAT_FRAGMENT_SHADER)
    const advectProgram = createProgram(gl, VERTEX_SHADER, ADVECT_FRAGMENT_SHADER)
    const displayProgram = createProgram(gl, VERTEX_SHADER, DISPLAY_FRAGMENT_SHADER)
    if (!splatProgram || !advectProgram || !displayProgram) return

    const fb1 = gl.createFramebuffer()
    const fb2 = gl.createFramebuffer()
    let tex1 = gl.createTexture()
    let tex2 = gl.createTexture()

    const initTexture = (tex: WebGLTexture | null, w: number, h: number) => {
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }

    const initFramebuffers = () => {
      initTexture(tex1, canvas.width, canvas.height)
      initTexture(tex2, canvas.width, canvas.height)
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb1)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex1, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb2)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex2, 0)
    }
    initFramebuffers()

    const swap = () => {
      const tmp = tex1
      tex1 = tex2
      tex2 = tmp
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb1)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex1, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb2)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex2, 0)
    }

    const mouse = { x: 0, y: 0, px: 0, py: 0, active: false }

    const onMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      mouse.px = mouse.x
      mouse.py = mouse.y
      mouse.x = e.clientX * dpr
      mouse.y = (window.innerHeight - e.clientY) * dpr
      mouse.active = true
    }
    window.addEventListener('mousemove', onMouseMove)

    const splat = (x: number, y: number, dx: number, dy: number) => {
      gl.useProgram(splatProgram)

      const posLoc = gl.getAttribLocation(splatProgram, 'a_position')
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
      gl.enableVertexAttribArray(posLoc)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

      gl.uniform2f(gl.getUniformLocation(splatProgram, 'u_target'), x, y)
      gl.uniform1f(gl.getUniformLocation(splatProgram, 'u_radius'), 40.0)
      gl.uniform2f(
        gl.getUniformLocation(splatProgram, 'u_resolution'),
        canvas.width,
        canvas.height
      )

      const speed = Math.sqrt(dx * dx + dy * dy)
      const intensity = Math.min(speed / 800, 1.0)
      gl.uniform3f(
        gl.getUniformLocation(splatProgram, 'u_color'),
        0.4 + intensity * 0.4,
        0.2 + intensity * 0.3,
        0.8 + intensity * 0.2
      )

      gl.bindFramebuffer(gl.FRAMEBUFFER, fb2)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      gl.disable(gl.BLEND)

      swap()
    }

    const advect = () => {
      gl.useProgram(advectProgram)

      const posLoc = gl.getAttribLocation(advectProgram, 'a_position')
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
      gl.enableVertexAttribArray(posLoc)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, tex1)
      gl.uniform1i(gl.getUniformLocation(advectProgram, 'u_texture'), 0)
      gl.uniform2f(
        gl.getUniformLocation(advectProgram, 'u_resolution'),
        canvas.width,
        canvas.height
      )
      gl.uniform1f(gl.getUniformLocation(advectProgram, 'u_decay'), 0.92)

      gl.bindFramebuffer(gl.FRAMEBUFFER, fb2)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      swap()
    }

    const display = () => {
      gl.useProgram(displayProgram)

      const posLoc = gl.getAttribLocation(displayProgram, 'a_position')
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
      gl.enableVertexAttribArray(posLoc)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, tex1)
      gl.uniform1i(gl.getUniformLocation(displayProgram, 'u_texture'), 0)
      gl.uniform2f(
        gl.getUniformLocation(displayProgram, 'u_resolution'),
        canvas.width,
        canvas.height
      )

      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      gl.disable(gl.BLEND)
    }

    let lastTime = performance.now()

    const loop = () => {
      const now = performance.now()
      const dt = Math.min((now - lastTime) / 16.67, 3)
      lastTime = now

      if (mouse.active) {
        const dx = (mouse.x - mouse.px) * dt
        const dy = (mouse.y - mouse.py) * dt
        splat(mouse.x, mouse.y, dx, dy)
        mouse.active = false
      }

      advect()
      display()

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      gl.deleteBuffer(quadBuffer)
      gl.deleteFramebuffer(fb1)
      gl.deleteFramebuffer(fb2)
      gl.deleteTexture(tex1)
      gl.deleteTexture(tex2)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}