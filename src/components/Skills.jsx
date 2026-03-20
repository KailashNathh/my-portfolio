import { useState, useEffect, useRef } from 'react'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaGitAlt , FaJava} from 'react-icons/fa'
import { FaDatabase } from 'react-icons/fa'

function Skills() {
  const [skills] = useState([
    { name: 'HTML5', icon: FaHtml5, progress: 95 },
    { name: 'CSS3', icon: FaCss3Alt, progress: 90 },
    { name: 'JavaScript', icon: FaJs, progress: 85 },
    { name: 'React', icon: FaReact, progress: 80 },
    { name: 'Node.js', icon: FaNodeJs, progress: 75 },
    { name: 'Python', icon: FaPython, progress: 70 },
    { name: 'SQL', icon: FaDatabase, progress: 75 },
    { name: 'Git', icon: FaGitAlt, progress: 85 },
    { name: 'Java', icon: FaJava, progress: 85 },
  ])

  const [animatedSkills, setAnimatedSkills] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const element = sectionRef.current
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight - 100) {
          if (!isVisible) {
            setIsVisible(true)
            skills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedSkills(prev => ({ ...prev, [skill.name]: skill.progress }))
              }, index * 100)
            })
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [skills, isVisible])

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      {/* Creative transition separator */}
      <div className="section-transition">
        <div className="transition-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="transition-fill"></path>
          </svg>
        </div>
        <div className="transition-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="transition-particle" style={{
              '--delay': `${Math.random() * 2}s`,
              '--x': `${Math.random() * 100}%`,
              '--duration': `${2 + Math.random() * 2}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="skills-background">
        <div className="skills-orb skills-orb-1"></div>
        <div className="skills-orb skills-orb-2"></div>
        {/* Floating code symbols */}
        <div className="skills-code-bg">
          <span className="code-symbol-bg">&lt;div&gt;</span>
          <span className="code-symbol-bg">&lt;/&gt;</span>
          <span className="code-symbol-bg">{'{ }'}</span>
          <span className="code-symbol-bg">( )</span>
          <span className="code-symbol-bg">[ ]</span>
          <span className="code-symbol-bg">=&gt;</span>
        </div>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-subtitle glitch-text" data-text="What I work with">What I work with</span>
          <h2 className="section-title glitch-text" data-text="Skills & Expertise">Skills & Expertise</h2>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              className={`skill-card ${hoveredSkill === skill.name ? 'hovered' : ''}`}
              key={skill.name}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                '--card-index': index,
                '--stagger-delay': `${index * 0.1}s`
              }}
            >
              <div className="skill-card-inner">
                <div className="skill-card-front">
                  <div className="skill-icon">
                    <skill.icon />
                  </div>
                  <h3>{skill.name}</h3>
                  <div className="skill-bar">
                    <div className="skill-progress-wave"></div>
                    <div
                      className="skill-progress"
                      style={{ width: `${animatedSkills[skill.name] || 0}%` }}
                    />
                  </div>
                  <span className="skill-percentage">{animatedSkills[skill.name] || 0}%</span>
                  <div className="skill-level-indicator">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`level-dot ${i < Math.ceil((animatedSkills[skill.name] || 0) / 20) ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="skill-card-back">
                  <div className="skill-card-back-content">
                    <skill.icon className="back-icon" />
                    <h3>{skill.name}</h3>
                    <p>Mastered through years of practice and projects</p>
                    <div className="skill-tags">
                      <span>Frontend</span>
                      <span>Backend</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating particles on hover */}
              <div className="card-particles">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="card-particle" style={{ '--i': i }}></span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills