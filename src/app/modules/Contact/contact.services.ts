import { sendEmailService } from "../../utils/sendEmail";
import { contactEmailHtml } from "../../view/contactHtml";
import config from "../../config";


const sendEmail = async (name: string, email: string, message: string) => {
  // Generate HTML email template
  const htmlContent = contactEmailHtml(name, email, message);

  // Email configuration
  const recipientEmail = config.email_sender_user || ''; // Send to your admin email
  const subject = `New Contact Form Submission from ${name}`;
  const textContent = `You have received a new contact form submission.\n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  // Send email
  await sendEmailService(recipientEmail, htmlContent, subject, textContent);
};

export const ContactServices = {
  sendEmail,
};
