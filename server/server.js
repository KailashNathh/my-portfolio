import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Configure Nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'kailashnathac@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'tsgf mail hcde pgpt'
  }
})

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration error:', error)
  } else {
    console.log('✅ Email server is ready to send emails')
  }
})

// Email route
app.post('/api/send-email', async (req, res) => {
  try {
    const { from_name, from_email, subject, message } = req.body

    // Validate input
    if (!from_name || !from_email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      })
    }

    // Email to send to your inbox
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kailashnathac@gmail.com',
      subject: `New message from ${from_name}: ${subject}`,
     html: `
  <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #4f46e5, #9333ea); color: #fff; padding: 20px;">
        <h2 style="margin: 0;">🚀 New Client Inquiry</h2>
        <p style="margin: 5px 0 0; font-size: 14px;">You’ve received a new message from your portfolio</p>
      </div>

      <!-- Body -->
      <div style="padding: 20px; color: #333;">
        
        <p style="margin: 0 0 10px;"><strong>Name:</strong><br>${from_name}</p>
        
        <p style="margin: 0 0 10px;">
          <strong>Email:</strong><br>
          <a href="mailto:${from_email}" style="color: #4f46e5; text-decoration: none;">
            ${from_email}
          </a>
        </p>

        <p style="margin: 0 0 10px;"><strong>Subject:</strong><br>${subject}</p>

        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <div style="margin-top: 8px; padding: 15px; background: #f9fafb; border-radius: 6px; border-left: 4px solid #4f46e5;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        Sent from your portfolio contact form • Stay sharp ⚡
      </div>

    </div>
  </div>
`
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    console.log('✅ Email sent:', info.response)
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    })

  } catch (error) {
    console.error('❌ Error sending email:', error)
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email: ' + error.message 
    })
  }
})

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
