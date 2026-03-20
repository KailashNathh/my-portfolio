import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa'

// Use API endpoint - in production on Vercel, this will be relative /api path
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Contact() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    const formData = {
      from_name: e.target.name.value,
      from_email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value
    }

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        alert('✅ Message sent successfully! I will get back to you soon.')
        e.target.reset()
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Email error:', error)
      setStatus('error')
      alert('❌ Failed to send message: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Let's connect</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>kailashnathac@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p>+1 234 567 8900</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-details">
                <h4>Bangalore </h4>
                <p>KA, India</p>
              </div>
            </div>
            <div className="social-links">
              <a href="https://github.com/KailashNathh/" className="social-link"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/kailash-nath-chandaluru/" className="social-link"><FaLinkedinIn /></a>
              <a href="#" className="social-link"><FaTwitter /></a>
              <a href="https://www.instagram.com/kailash_chandaluru/?utm_source=ig_web_button_share_sheet" className="social-link"><FaInstagram /></a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" name="subject" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact