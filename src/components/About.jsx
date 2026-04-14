import { useState, useEffect, useRef } from 'react'

function About() {
  const [stats, setStats] = useState({ years: 0, projects: 0, clients: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about')
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight - 100 && !isVisible) {
          setIsVisible(true)
          animateStats()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  // Particle animation for About section
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let animationId

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`
        ctx.fill()
      }
    }

    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(108, 92, 231, ${0.05 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      connectParticles()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const animateStats = () => {
    const targets = { years: 2, projects: 5, clients: 2 }
    const duration = 2000

    const interval = setInterval(() => {
      setStats(prev => {
        const newStats = { ...prev }
        let complete = true

        if (newStats.years < targets.years) {
          newStats.years += 1
          complete = false
        }
        if (newStats.projects < targets.projects) {
          newStats.projects += 1
          complete = false
        }
        if (newStats.clients < targets.clients) {
          newStats.clients += 1
          complete = false
        }

        if (complete) clearInterval(interval)
        return newStats
      })
    }, duration / Math.max(targets.years, targets.projects, targets.clients))
  }

  return (
    <section id="about" className="about">
      <div className="about-background">
        {/* Floating gradient orbs */}
        <div className="about-orb about-orb-1"></div>
        <div className="about-orb about-orb-2"></div>
        <div className="about-orb about-orb-3"></div>
        <div className="about-orb about-orb-4"></div>

        {/* Grid pattern */}
        <div className="about-grid"></div>

        {/* Particle canvas */}
        <canvas ref={canvasRef} className="about-particles"></canvas>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get to know</span>
          <h2 className="section-title">About Me</h2>
        </div>
        <div className="about-content">
          <div className="about-image">
            <div className="image-wrapper">
              <img
                src="image.png"
                alt="Profile"
                className="profile-image"
              />
              <div className="image-border"></div>
            </div>
          </div>
          <div className="about-text">
            <h3>Who I Am</h3>
            <p>
              I'm a passionate developer with a keen eye for design and a love for creating
              seamless digital experiences. With expertise spanning front-end development,
              UI/UX design, and creative coding, I bring ideas to life through code.
            </p>
            <p>
              My journey in tech has been driven by curiosity and a desire to create
              meaningful solutions that make a difference. I believe in the power of
              clean code, thoughtful design, and continuous learning.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">{stats.years}+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.projects}</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.clients}</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About