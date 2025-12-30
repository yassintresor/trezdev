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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

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
      description: "A comprehensive enterprise platform for tracking and managing oil inventory with real-time analytics, reporting capabilities, and predictive insights. Features include automated alerts, multi-location support, and advanced data visualization for supply chain optimization.",
      tech: ["React", "TypeScript", "Next.js", "Vercel"],
      image: "https://images.pexels.com/photos/3962643/pexels-photo-3962643.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "https://the-oil-tracking.vercel.app/"
    },
    {
      title: "E-Commerce Platform",
      description: "Modern full-stack e-commerce solution featuring seamless payment integration, real-time inventory management, intelligent product recommendations, and responsive design. Built with cutting-edge technologies for optimal performance and user experience.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "#"
    },
    {
      title: "Interactive 3D Portfolio",
      description: "Immersive portfolio experience utilizing Three.js and WebGL for stunning 3D visualizations. Features smooth animations, particle effects, interactive elements, and optimized performance across all devices. Showcases advanced frontend development skills.",
      tech: ["Three.js", "React", "WebGL", "GSAP"],
      image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "#"
    },
    {
      title: "Real-Time Dashboard",
      description: "Advanced analytics dashboard providing real-time data visualization, customizable widgets, and comprehensive reporting tools. Features WebSocket integration for live updates, interactive charts, and export capabilities for data-driven decision making.",
      tech: ["React", "D3.js", "WebSocket", "Express"],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "#"
    },
    {
      title: "Mobile Fitness App",
      description: "Cross-platform mobile fitness application with workout tracking, nutrition planning, progress analytics, and social features. Includes AI-powered workout recommendations, real-time performance metrics, and seamless cloud synchronization.",
      tech: ["React Native", "Firebase", "Redux", "TensorFlow"],
      image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "#"
    },
    {
      title: "AI Content Generator",
      description: "Intelligent content generation platform leveraging advanced AI models to create high-quality written content, images, and marketing materials. Features customizable templates, SEO optimization, and multi-language support for global reach.",
      tech: ["Python", "React", "OpenAI", "FastAPI"],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "#"
    }
  ]

  const skills = [
    {
      name: "Frontend Development",
      icon: Code,
      level: 95,
      description: "Expert in React, TypeScript, Next.js, and modern frontend architectures with focus on performance and user experience."
    },
    {
      name: "3D Graphics & WebGL",
      icon: Palette,
      level: 88,
      description: "Specialized in Three.js, WebGL, and immersive 3D experiences with optimized rendering and interactive animations."
    },
    {
      name: "Performance Optimization",
      icon: Zap,
      level: 92,
      description: "Advanced optimization techniques including code splitting, lazy loading, and efficient state management for blazing-fast applications."
    },
    {
      name: "Backend & APIs",
      icon: Database,
      level: 87,
      description: "Proficient in Node.js, Express, and database design with RESTful and GraphQL API development expertise."
    },
    {
      name: "UI/UX Design",
      icon: Layout,
      level: 90,
      description: "Strong design fundamentals with expertise in Figma, responsive design, and creating intuitive user interfaces."
    },
    {
      name: "Mobile Development",
      icon: Smartphone,
      level: 85,
      description: "React Native development with cross-platform solutions and native performance optimization."
    }
  ]

  return (
    <div ref={containerRef} className="portfolio-container">
      <BackgroundCanvas />

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
            Full-Stack Developer & 3D Specialist
          </motion.p>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Transforming innovative ideas into exceptional digital experiences through cutting-edge technology,
            creative design, and meticulous attention to detail. Specializing in modern web applications,
            3D graphics, and performance-driven solutions.
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
              I'm Gihozo Yassin, a passionate full-stack developer who specializes in creating
              exceptional digital experiences. With deep expertise in modern web technologies, 3D graphics,
              and performance optimization, I transform complex challenges into elegant, user-centric solutions.
              My approach combines technical excellence with creative vision to deliver applications that not only
              meet requirements but exceed expectations.
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
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
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
                <p>Full-Stack Developer</p>
              </div>
            </div>
            <div className="contact-links">
              <motion.a
                className="contact-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContactClick('email')}
              >
                <Mail className="contact-icon" />
                <span>tresoryassin221@gmail.com</span>
              </motion.a>
              <motion.a
                className="contact-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContactClick('github')}
              >
                <Github className="contact-icon" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                className="contact-link"
                whileHover={{ scale: 1.05 }}
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
