import nodemailer from 'nodemailer';
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmailUsingNodeMailer(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Create a transporter object using your email provider's SMTP server
    // console.log(username)
    // console.log(verifyCode)
    const transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email", // Or use your real SMTP provider
      service: 'gmail',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for other ports
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASS, // Use environment variables
      },
    });

    // Construct the email options
    let mailOptions: any = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: email, // Recipient's email address
      subject: 'Mystery Message Verification Code',
      // html:  VerificationEmail({ username, otp: verifyCode }), // Converted HTML string
      text: `Hello ${username},\n\nThank you for registering. Please use the following verification code to complete your registration:\n\n${verifyCode}\n\nIf you did not request this code, please ignore this email.`,
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    // console.log('Email sent: ' + info.response);

    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
