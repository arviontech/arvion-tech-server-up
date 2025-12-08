import { sendEmailService } from "../../utils/sendEmail";
import { contactEmailHtml } from "../../view/contactHtml";
import config from "../../config";

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

const sendEmail = async (contactData: ContactData) => {
  const { name, email, phone, company, service, budget, message } = contactData;
  
  // Generate HTML email template with all fields
  const htmlContent = contactEmailHtml(name, email, message, phone, company, service, budget);

  // Email configuration
  const recipientEmail = config.email_sender_user || ''; // Send to your admin email
  const subject = `New Contact Form Submission from ${name}`;
  
  let textContent = `You have received a new contact form submission.\n\nFrom: ${name}\nEmail: ${email}`;
  if (phone) textContent += `\nPhone: ${phone}`;
  if (company) textContent += `\nCompany: ${company}`;
  if (service) textContent += `\nService: ${service}`;
  if (budget) textContent += `\nBudget: ${budget}`;
  textContent += `\n\nMessage:\n${message}`;

  // Send email
  await sendEmailService(recipientEmail, htmlContent, subject, textContent);
};

export const ContactServices = {
  sendEmail,
};
