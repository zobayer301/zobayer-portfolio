import { useIsMobile } from '@/hooks/use-mobile'

export function GrainOverlay() {
  const isMobile = useIsMobile()
  if (isMobile) return null
  return <div className="grain-overlay" aria-hidden="true" />
}
