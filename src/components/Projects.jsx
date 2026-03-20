import { useState, useEffect, useRef } from 'react'
import { FaProjectDiagram, FaMobileAlt, FaStore, FaChartLine, FaRobot, FaCloud, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

function Projects() {
  const [projects] = useState([
    {
      id: 1,
      title: 'Bank Application Project',
      description: 'Java-based bank app with account management features. Requires Tomcat Server.',
      icon: FaProjectDiagram,
      tags: ['Java', 'Mysql', 'Jsp', 'Servlets', 'Tomcat', 'HTML', 'CSS' ],
    },
    {
      id: 2,
      title: 'City Starter Project (Finding the best places in the city for rental and food)',
      description: 'Mobile app to discover the best rental properties and food places in your city.',
      icon: FaMobileAlt,
      tags: ['React js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Express.js','Supabase' ],
    },
    {
      id: 3,
      title: 'BRSR_NEXT Project',
      description: 'Business Sustainability and Responsibility reporting platform for corporate compliance and ESG tracking.',
      icon: FaStore,
      tags: ['React js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Express.js','Supabase' , 'stripe'],
    },
    {
      id: 4,
      title: 'TeaDay Project',
      description: 'On-demand tea and snack ordering app connecting customers with vendors for quick delivery.',
      icon: FaChartLine,
      tags: ['React js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Express.js','Supabase' , 'stripe'],
    },
    {
      id: 5,
      title: 'Coming soon',
      description: 'Project description goes here. Edit this to describe your project.',
      icon: FaRobot,
      tags: ['Coming soon'],
    },
    {
      id: 6,
      title: 'Coming soon',
      description: 'Project description goes here. Edit this to describe your project.',
      icon: FaCloud,
      tags: ['Coming soon'],
    },
  ])

  const [visibleProjects, setVisibleProjects] = useState([])
  const [hoveredProject, setHoveredProject] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const element = sectionRef.current
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight - 100) {
          projects.forEach((_, index) => {
            setTimeout(() => {
              setVisibleProjects(prev => [...prev, index])
            }, index * 150)
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [projects])

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      {/* Background decorations */}
      <div className="projects-bg">
        <div className="project-glow project-glow-1"></div>
        <div className="project-glow project-glow-2"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">My recent work</span>
          <h2 className="section-title">Projects</h2>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              className={`project-card ${visibleProjects.includes(index) ? 'visible' : ''} ${hoveredProject === project.id ? 'hovered' : ''}`}
              key={project.id}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ '--project-index': index }}
            >
              <div className="project-image">
                <div className="project-placeholder">
                  <project.icon />
                </div>
                <div className="project-overlay">
                  <div className="overlay-icons">
                    <a href="#" className="project-link">
                      <FaExternalLinkAlt />
                    </a>
                    <a href="#" className="project-github">
                      <FaGithub />
                    </a>
                  </div>
                </div>
                {/* Scan line animation */}
                <div className="scan-line"></div>
                {/* Corner decorations */}
                <div className="corner corner-tl"></div>
                <div className="corner corner-tr"></div>
                <div className="corner corner-bl"></div>
                <div className="corner corner-br"></div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              {/* Card shine effect */}
              <div className="card-shine"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects