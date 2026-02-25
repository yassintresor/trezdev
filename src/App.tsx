import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, Database, Layout, Smartphone } from 'lucide-react'
import BackgroundCanvas from './components/BackgroundCanvas'
import Image from './assets/image.png'
import './App.css'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  })

  const aboutY = useTransform(aboutProgress, [0, 1], [100, -100])
  const aboutRotate = useTransform(aboutProgress, [0, 1], [-5, 5])

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
        window.location.href = 'mailto:tresoryassin221@gmail.com'
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
      title: "Oil Tracking Application",
      description: "Enterprise platform for tracking and managing oil inventory with real-time analytics. Built a responsive, intuitive dashboard with advanced data visualization, real-time updates, and automated alerts. Focused on performance optimization and seamless user experience.",
      tech: ["React", "TypeScript", "Next.js", "Vercel"],
      image: "https://images.pexels.com/photos/3962643/pexels-photo-3962643.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "https://the-oil-tracking.vercel.app/"
    },
    {
      title: "E-Commerce UI System",
      description: "Built a complete frontend architecture for a modern e-commerce platform with responsive product grids, shopping cart functionality, and seamless checkout flow. Optimized for mobile and desktop with pixel-perfect design implementation.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Redux"],
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "https://commerce-canvas-bice.vercel.app"
    },
    {
      title: "Component Library",
      description: "Created a comprehensive, reusable component library with 50+ components following atomic design principles. Fully typed with TypeScript, documented with Storybook, and accessible following WCAG guidelines. Improved team productivity by 40%.",
      tech: ["React", "TypeScript", "Storybook", "CSS Modules"],
      image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "#"
    },
    {
      title: "Analytics Dashboard",
      description: "Frontend-focused analytics dashboard with interactive charts, real-time data updates, and customizable widgets. Implemented efficient state management with complex filters and data transformations. Achieved sub-second load times through optimization.",
      tech: ["React", "D3.js", "Redux Toolkit", "Chart.js"],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "#"
    },
    {
      title: "Progressive Web App",
      description: "Built a fully responsive PWA with offline functionality, service workers, and smooth animations. Responsive design system that adapts beautifully to all screen sizes. Achieved 95+ Lighthouse score for performance and accessibility.",
      tech: ["React", "PWA", "Service Workers", "Framer Motion"],
      image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "#"
    },
    {
      title: "Design System Implementation",
      description: "Translated Figma designs into production-ready React components with pixel-perfect accuracy. Implemented comprehensive token system for colors, typography, and spacing. Maintained 100% consistency across all products and platforms.",
      tech: ["React", "TypeScript", "Figma", "Styled Components"],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "#"
    }
  ]

  const skills = [
    {
      name: "React & TypeScript",
      icon: Code,
      level: 95,
      description: "Expert in React, TypeScript, Next.js, and modern component architectures with focus on scalability and maintainability."
    },
    {
      name: "Responsive Design",
      icon: Layout,
      level: 93,
      description: "Master of creating responsive, accessible interfaces that work seamlessly across all devices and screen sizes."
    },
    {
      name: "Performance Optimization",
      icon: Zap,
      level: 92,
      description: "Advanced optimization techniques including code splitting, lazy loading, memoization, and efficient state management."
    },
    {
      name: "CSS & Animations",
      icon: Palette,
      level: 94,
      description: "Proficient in modern CSS, Tailwind, styled-components, and creating smooth, delightful animations with Framer Motion."
    },
    {
      name: "Web APIs & Integration",
      icon: Database,
      level: 88,
      description: "Strong expertise in REST APIs, GraphQL, WebSockets, and seamless third-party service integration."
    },
    {
      name: "Testing & Quality",
      icon: Smartphone,
      level: 86,
      description: "Comprehensive testing with Jest, React Testing Library, and end-to-end testing to ensure robust, reliable applications."
    }
  ]

  return (
    <div ref={containerRef} className="portfolio-container">
      <BackgroundCanvas />

      <motion.section className="hero-section">
        <motion.div
          className="hero-content"
          style={{ y: textY, opacity, scale }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Gihozo Yassin
          </motion.h1>
          <motion.div
            className="hero-profile"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="profile-image">
              <img
                src={Image}
                alt="Gihozo Yassin - Creative Developer"
              />
            </div>
          </motion.div>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Frontend Developer
          </motion.p>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Crafting beautiful, responsive, and high-performance user interfaces. Specializing in React, TypeScript,
            and modern web technologies to build engaging digital experiences that delight users and solve real problems.
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
              View Projects
            </button>
            <button
              className="cta-button secondary"
              onClick={() => scrollToSection(contactRef)}
            >
              Contact Me
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

      <motion.section ref={aboutRef} className="about-section">
        <div className="section-container">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ y: aboutY }}
          >
            <h2 className="section-title">About Me</h2>
            <p className="about-text">
              I'm Gihozo Yassin, a passionate frontend developer dedicated to crafting exceptional user interfaces
              and experiences. With deep expertise in React, TypeScript, and modern web technologies, I transform
              complex design concepts into clean, maintainable code. My approach combines technical excellence with
              attention to detail, delivering performant applications that not only meet requirements but exceed expectations.
            </p>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-card"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                >
                  <skill.icon className="skill-icon" />
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-description">{skill.description}</p>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

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
                initial={{ opacity: 0, y: 100, rotateX: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  y: -15,
                  scale: 1.03,
                  rotateY: 3,
                  rotateX: 3,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
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

      <motion.section ref={contactRef} className="contact-section">
        <div className="section-container">
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Let's Build Something Amazing</h2>
            <p className="contact-text">
              Ready to bring your vision to life? Whether it's a complex web application, an immersive 3D experience,
              or a cutting-edge mobile solution, I'm here to help transform your ideas into reality.
              Let's collaborate and create something extraordinary together.
            </p>
            <div className="contact-profile">
              <div className="contact-avatar">
                <img
                  src={Image}
                  alt="Gihozo Yassin - Creative Developer"
                />
              </div>
              <div className="contact-info">
                <h3>Gihozo Yassin</h3>
                <p>Frontend Developer</p>
              </div>
            </div>
            <div className="contact-links">
              <motion.a
                className="contact-link"
                initial={{ opacity: 0, x: -50, rotateY: -20 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, rotateZ: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContactClick('email')}
              >
                <Mail className="contact-icon" />
                <span>tresoryassin221@gmail.com</span>
              </motion.a>
              <motion.a
                className="contact-link"
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, rotateZ: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContactClick('github')}
              >
                <Github className="contact-icon" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                className="contact-link"
                initial={{ opacity: 0, x: 50, rotateY: 20 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, rotateZ: 2 }}
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
