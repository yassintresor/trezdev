import { useEffect, useRef } from 'react'

interface SplineViewerProps {
  url: string
  className?: string
}

export default function SplineViewer({ url, className = '' }: SplineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://prod.spline.design/fkP3A0wQG-3R_yAX/scene.js'
    script.async = true

    if (containerRef.current) {
      containerRef.current.appendChild(script)
    }

    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script)
      }
    }
  }, [url])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px'
      }}
    >
      <script type="importmap">
        {JSON.stringify({
          imports: {
            '@splinetool/runtime': 'https://unpkg.com/@splinetool/runtime@1.0.33/build/runtime.js'
          }
        })}
      </script>
      <spline-viewer url={url}></spline-viewer>
    </div>
  )
}
