import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ShaderBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(
            window.innerWidth * Math.min(window.devicePixelRatio, 1.5),
            window.innerHeight * Math.min(window.devicePixelRatio, 1.5)
          ),
        },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u * u * (3.0 - 2.0 * u);
          return mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.3;
          vec2 shift = vec2(100.0);
          mat2 rot = mat2(0.877, 0.479, -0.479, 0.877);
          for (int i = 0; i < 2; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / iResolution.y;
          uv -= vec2(0.5 * iResolution.x / iResolution.y, 0.5);
          uv *= mat2(6.0, -4.0, 4.0, 6.0);

          vec4 o = vec4(0.0);
          float f = 2.0 + fbm(uv + vec2(iTime * 5.0, 0.0)) * 0.5;

          for (float i = 0.0; i < 20.0; i++) {
            vec2 v = uv + cos(i * i + (iTime + uv.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5;
            float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - i / 20.0);
            vec4 col = vec4(
              0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
              0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
              0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
              1.0
            );
            float contribution = exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
            o += col * contribution * (1.0 + tailNoise * 0.8) * smoothstep(0.0, 1.0, i / 20.0) * 0.6;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));
          gl_FragColor = o * 1.5;
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      material.uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(dpr);
      material.uniforms.iResolution.value.set(
        window.innerWidth * dpr,
        window.innerHeight * dpr
      );
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none will-change-transform"
    />
  );
};