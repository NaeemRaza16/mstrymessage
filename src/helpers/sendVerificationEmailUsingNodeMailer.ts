import nodemailer from 'nodemailer';
import ReactDOMServer from 'react-dom/server';
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmailUsingNodeMailer(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Create a transporter object using your email provider's SMTP server
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider's service, e.g., 'hotmail', 'yahoo', etc.
      auth: {
        user: 'muhammadnaeemraza16@gmail.com', // Your Gmail address or email address of your choice
        pass: 'Facethefire@2511', // Your Gmail password or App Password if 2FA is enabled
      },
    });

    // Convert the JSX component to an HTML string
    // const emailContent = ReactDOMServer.renderToString(
    //   <VerificationEmail username={username} otp={verifyCode} />
    // );

    // Construct the email options
    let mailOptions: any = {
      from: 'muhammadnaeemraza16@gmail.com', // Sender's email address
      to: email, // Recipient's email address
      subject: 'Mystery Message Verification Code',
      html: VerificationEmail({ username, otp: verifyCode }), // Converted HTML string
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
