import { useState, useEffect, useRef } from 'react'

function Experience() {
  const [experiences] = useState([
    {
      id: 1,
      date: '2026 - Present',
      title: 'Associate',
      company: 'Cognizant Technology Solutions',
      description: 'Built scalable cloud-based applications and optimized cloud infrastructure for performance and cost efficiency.',
    },
    {
      id: 2,
      date: '2025 - 2026',
      title: 'Prompt Engineer',
      company: 'Revify Private Limited',
      description: 'Developed AI prompt engineering tools and optimized workflows using advanced coding techniques.',
    },
    {
      id: 3,
      date: '2024 - 2025',
      title: 'Intern Full stack Developer',
      company: 'Sathya Technologies',
      description: 'Started career journey, learned modern technologies, contributed to various projects.',
    },
  ])

  const [visibleItems, setVisibleItems] = useState([])
  const [typingDone, setTypingDone] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const element = sectionRef.current
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight - 100) {
          // Typing animation for title
          if (!typingDone) {
            let i = 0
            const interval = setInterval(() => {
              i++
              if (i >= 15) {
                clearInterval(interval)
                setTypingDone(true)
              }
            }, 60)
          }
          // Stagger timeline item reveals
          experiences.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index])
            }, 300 + index * 300)
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [experiences, typingDone])

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      {/* Code rain background effect */}
      <div className="code-rain">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="code-column" style={{
            '--delay': `${Math.random() * 5}s`,
            '--x': `${Math.random() * 100}%`,
            '--duration': `${8 + Math.random() * 4}s`
          }}>
            {[...Array(15)].map((_, j) => (
              <span key={j} className="code-symbol">
                {['{', '}', '<', '/>', ';', '()', '[]', '=>', '::', '++'][Math.floor(Math.random() * 10)]}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Floating syntax decorations */}
      <div className="syntax-decorations">
        <div className="syntax-tag">&lt;/&gt;</div>
        <div className="syntax-tag syntax-tag-2">001</div>
        <div className="syntax-tag syntax-tag-3">true</div>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">// My journey</span>
          <h2 className="section-title">
            <span className="code-bracket">{'{'}</span>
            {'Experience'}
            <span className="code-bracket">{'}'}</span>
            <span className="typing-cursor"></span>
          </h2>
        </div>

        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command">loading experience.log</span>
          <span className="terminal-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </span>
        </div>

        <div className="timeline">
          <div className="timeline-line-animation"></div>
          {experiences.map((exp, index) => (
            <div
              className={`timeline-item ${visibleItems.includes(index) ? 'visible' : ''}`}
              key={exp.id}
            >
              <div className="timeline-dot">
                <div className="dot-inner"></div>
                <div className="dot-ring"></div>
              </div>
              <div className="timeline-content">
                <div className="code-comment">{`// ${exp.date}`}</div>
                <span className="timeline-date">{exp.date}</span>
                <h3>
                  <span className="function-name">{exp.title.split(' ')[0]}</span>
                  {exp.title.split(' ').slice(1).join(' ')}
                </h3>
                <h4>{exp.company}</h4>
                <p>{exp.description}</p>
                <div className="compile-bar">
                  <div className="compile-progress"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience