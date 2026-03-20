import nodemailer from 'nodemailer'

// Configure Nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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
        <p style="margin: 5px 0 0; font-size: 14px;">You've received a new message from your portfolio</p>
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
}
