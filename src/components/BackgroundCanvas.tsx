import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  targetX: number
  targetY: number
}

const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)

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

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000))
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 60 + 220, // Blue to purple range
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height
        })
      }
    }

    initParticles()

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    // Create connection lines between nearby particles
    const drawConnections = () => {
      const maxDistance = 120
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2
            ctx.strokeStyle = `hsla(240, 50%, 70%, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Draw mouse interaction effects
    const drawMouseEffects = () => {
      const mouse = mouseRef.current
      if (mouse.x === 0 && mouse.y === 0) return

      // Mouse glow
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 150
      )
      gradient.addColorStop(0, 'rgba(102, 126, 234, 0.1)')
      gradient.addColorStop(0.5, 'rgba(102, 126, 234, 0.05)')
      gradient.addColorStop(1, 'rgba(102, 126, 234, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2)
      ctx.fill()

      // Connect nearby particles to mouse
      const maxDistance = 200
      particlesRef.current.forEach(particle => {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.3
          ctx.strokeStyle = `hsla(250, 60%, 80%, ${opacity})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()

          // Pull particles towards mouse
          const force = (1 - distance / maxDistance) * 0.02
          particle.vx += (mouse.x - particle.x) * force * 0.01
          particle.vy += (mouse.y - particle.y) * force * 0.01
        }
      })
    }

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update particles
      particlesRef.current.forEach(particle => {
        // Add floating motion
        particle.x += particle.vx + Math.sin(timeRef.current + particle.x * 0.01) * 0.1
        particle.y += particle.vy + Math.cos(timeRef.current + particle.y * 0.01) * 0.1

        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Pulsing opacity
        const pulseOpacity = particle.opacity + Math.sin(timeRef.current * 2 + particle.x * 0.01) * 0.1

        // Draw particle
        ctx.save()
        ctx.globalAlpha = Math.max(0.1, pulseOpacity)
        ctx.fillStyle = `hsl(${particle.hue + Math.sin(timeRef.current) * 10}, 60%, 60%)`
        ctx.shadowBlur = 15
        ctx.shadowColor = `hsl(${particle.hue}, 60%, 60%)`
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw connections
      drawConnections()

      // Draw mouse effects
      drawMouseEffects()

      // Add ambient waves
      ctx.save()
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = `hsl(${240 + Math.sin(timeRef.current) * 20}, 50%, 70%)`
      ctx.lineWidth = 2
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height / 2 + 
                   Math.sin((x + timeRef.current * 100) * 0.01 + i * 2) * 50 +
                   Math.sin((x + timeRef.current * 50) * 0.005 + i) * 30
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }
      ctx.restore()

      animationRef.current = requestAnimationFrame(animate)
    }

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', () => {
      resizeCanvas()
      initParticles()
    })

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
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  )
}

export default BackgroundCanvas