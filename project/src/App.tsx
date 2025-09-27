import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap } from 'lucide-react'
import ThreeScene from './components/ThreeScene'
import './App.css'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleProjectClick = (link: string) => {
    if (link !== "#") {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  const handleContactClick = (type: string) => {
    switch (type) {
      case 'email':
        window.location.href = 'mailto:alex.morgan@portfolio.dev'
        break
      case 'github':
        window.open('https://github.com', '_blank', 'noopener,noreferrer')
        break
      case 'linkedin':
        window.open('https://linkedin.com', '_blank', 'noopener,noreferrer')
        break
    }
  }

  const projects = [
    {
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization of neural networks with real-time training data",
      tech: ["React", "Three.js", "WebGL", "TensorFlow.js"],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "https://github.com/example/neural-viz"
    },
    {
      title: "Quantum Computing Simulator",
      description: "Web-based quantum circuit simulator with interactive qubit manipulation",
      tech: ["TypeScript", "WebAssembly", "Canvas API", "Node.js"],
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "https://github.com/example/quantum-sim"
    },
    {
      title: "AR Portfolio Experience",
      description: "Augmented reality portfolio viewer using WebXR and spatial computing",
      tech: ["WebXR", "A-Frame", "JavaScript", "GLSL"],
      image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "https://github.com/example/ar-portfolio"
    }
  ]

  const skills = [
    { name: "Frontend Development", icon: Code, level: 95 },
    { name: "3D Graphics & WebGL", icon: Palette, level: 88 },
    { name: "Performance Optimization", icon: Zap, level: 92 }
  ]

  return (
    <div ref={containerRef} className="portfolio-container">
      {/* 3D Background Scene */}
      <div className="three-scene-container">
        <ThreeScene />
      </div>

      {/* Hero Section */}
      <motion.section className="hero-section">
        <motion.div 
          className="hero-content"
          style={{ y: textY }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Alex Morgan
          </motion.h1>
          <motion.div
            className="hero-profile"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="profile-image">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Alex Morgan - Creative Developer"
              />
            </div>
          </motion.div>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Creative Developer & 3D Artist
          </motion.p>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Crafting immersive digital experiences with cutting-edge technology
          </motion.p>
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <button 
              className="cta-button primary"
              onClick={() => scrollToSection(projectsRef)}
            >
              View My Work
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => scrollToSection(contactRef)}
            >
              Get In Touch
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="scroll-line"></div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section className="about-section">
        <div className="section-container">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">About Me</h2>
            <p className="about-text">
              I'm Alex Morgan, a passionate developer who bridges the gap between design and technology. 
              With expertise in modern web technologies and 3D graphics, I create experiences 
              that push the boundaries of what's possible on the web.
            </p>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="skill-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <skill.icon className="skill-icon" />
                  <h3 className="skill-name">{skill.name}</h3>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section ref={projectsRef} className="projects-section">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div 
                key={project.title}
                className="project-card"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div 
                  className="project-image"
                  onClick={() => handleProjectClick(project.link)}
                >
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <ExternalLink className="project-link-icon" />
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section ref={contactRef} className="contact-section">
        <div className="section-container">
          <motion.div 
            className="contact-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Let's Create Something Amazing</h2>
            <p className="contact-text">
              Ready to bring your ideas to life? Let's collaborate and build something extraordinary together.
            </p>
            <div className="contact-profile">
              <div className="contact-avatar">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200" 
                  alt="Alex Morgan"
                />
              </div>
              <div className="contact-info">
                <h3>Alex Morgan</h3>
                <p>Creative Developer & 3D Artist</p>
              </div>
            </div>
            <div className="contact-links">
              <motion.a 
                className="contact-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContactClick('email')}
              >
                <Mail className="contact-icon" />
                <span>alex.morgan@portfolio.dev</span>
              </motion.a>
              <motion.a 
                className="contact-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContactClick('github')}
              >
                <Github className="contact-icon" />
                <span>GitHub</span>
              </motion.a>
              <motion.a 
                className="contact-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContactClick('linkedin')}
              >
                <Linkedin className="contact-icon" />
                <span>LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default App