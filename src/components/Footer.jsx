function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">Portfolio</span>
          </div>
          <p className="footer-text">
            &copy; 2024 All rights reserved. Made with <i className="fas fa-heart"></i>
          </p>
          <div className="footer-links">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <a key={section} onClick={() => scrollToSection(section)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer