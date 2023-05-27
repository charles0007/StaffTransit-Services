const nodemailer = require('nodemailer');

export const sendValidationEmail=async(email, token)=>{
  try {
    // Create a nodemailer transporter with your email service provider details
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'qoladele.charles@gmail.com',
        pass: 'wpdmxnxihgmlhgum'
      }
    });
    
    // Create the email message
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Staff Transit Email Validation',
      html: `
        <p>Please enter the code below to validate your account:</p>
        <p>${token}</p>

        `
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Validation email sent: ${info.messageId}`);
    
  } catch (error) {
    console.error(error);
  }
}
