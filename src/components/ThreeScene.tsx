import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const particlesRef = useRef<THREE.Points>()
  const geometryRef = useRef<THREE.BufferGeometry>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Create particle system
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20

      // Color (gradient from blue to purple)
      const colorMix = Math.random()
      colors[i3] = 0.2 + colorMix * 0.6     // Red
      colors[i3 + 1] = 0.3 + colorMix * 0.4 // Green  
      colors[i3 + 2] = 0.8 + colorMix * 0.2 // Blue

      // Size
      sizes[i] = Math.random() * 3 + 1
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geometryRef.current = geometry

    // Particle material with custom shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: window.devicePixelRatio }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Add wave motion
          mvPosition.y += sin(time + position.x * 0.1) * 0.5;
          mvPosition.x += cos(time + position.z * 0.1) * 0.3;
          
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    // Add floating geometric shapes
    const shapes = []
    for (let i = 0; i < 5; i++) {
      const shapeGeometry = new THREE.OctahedronGeometry(0.5, 0)
      const shapeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6 + i * 0.1, 0.7, 0.5),
        wireframe: true,
        transparent: true,
        opacity: 0.3
      })
      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)
      
      shape.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      
      shapes.push(shape)
      scene.add(shape)
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Update particle shader uniform
      if (material.uniforms) {
        material.uniforms.time.value = time
      }

      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.1
        particlesRef.current.rotation.x = time * 0.05
      }

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x = time * (0.5 + index * 0.1)
        shape.rotation.y = time * (0.3 + index * 0.1)
        shape.position.y += Math.sin(time + index) * 0.01
      })

      // Mouse interaction
      const mouse = {
        x: (window.innerWidth / 2 - window.innerWidth / 2) / window.innerWidth,
        y: (window.innerHeight / 2 - window.innerHeight / 2) / window.innerHeight
      }

      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!cameraRef.current) return
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      
      cameraRef.current.position.x += (mouseX * 0.5 - cameraRef.current.position.x) * 0.05
      cameraRef.current.position.y += (mouseY * 0.5 - cameraRef.current.position.y) * 0.05
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
      
      if (geometryRef.current) {
        geometryRef.current.dispose()
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [])

  return <div ref={mountRef} className="three-scene" />
}

export default ThreeScene