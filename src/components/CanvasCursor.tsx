import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

const CanvasCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const lastMouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }

      // Create particles when mouse moves
      const distance = Math.sqrt(
        Math.pow(mouseRef.current.x - lastMouseRef.current.x, 2) +
        Math.pow(mouseRef.current.y - lastMouseRef.current.y, 2)
      )

      if (distance > 5) {
        createParticles(mouseRef.current.x, mouseRef.current.y, Math.min(distance / 5, 10))
        lastMouseRef.current = { ...mouseRef.current }
      }
    }

    // Create particles
    const createParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const particle: Particle = {
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1,
          maxLife: Math.random() * 60 + 30,
          size: Math.random() * 4 + 2,
          hue: Math.random() * 60 + 240 // Blue to purple range
        }
        particlesRef.current.push(particle)
      }
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update particle
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.98
        particle.vy *= 0.98
        particle.life -= 1

        // Draw particle
        const alpha = particle.life / particle.maxLife
        const size = particle.size * alpha

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`
        ctx.shadowBlur = 10
        ctx.shadowColor = `hsl(${particle.hue}, 70%, 60%)`
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        return particle.life > 0
      })

      // Draw cursor glow
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 50
        )
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)')
        gradient.addColorStop(0.5, 'rgba(102, 126, 234, 0.1)')
        gradient.addColorStop(1, 'rgba(102, 126, 234, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 50, 0, Math.PI * 2)
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resizeCanvas)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen'
      }}
    />
  )
}

export default CanvasCursor