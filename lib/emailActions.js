// lib/emailActions.js
"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL;

/**
 * Server Action to send a welcome email to a new user.
 * @param {string} toEmail - The recipient's email address.
 * @param {string} userName - The recipient's name.
 * @returns {{ success: boolean, message?: string }}
 */
export async function sendWelcomeEmail(toEmail, userName) {
  if (!fromEmail || !process.env.RESEND_API_KEY) {
    console.error("Resend API Key or FROM_EMAIL is not configured.");
    return { success: false, message: "Email service not configured." };
  }

  if (!toEmail) {
    return { success: false, message: "Recipient email is required." };
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail, // Must be a verified sender identity in Resend
      to: [toEmail],
      subject: `Welcome to ProjectLite, ${userName}!`,
      html: `
        <p>Hello <strong>${userName}</strong>,</p>
        <p>Welcome to ProjectLite! We're excited to help you manage your projects efficiently.</p>
        <p>You can get started by logging in here: <a href="https://yourdomain.com/dashboard">Go to Dashboard</a></p>
        <p>Best regards,<br/>The ProjectLite Team</p>
      `,
    });

    console.log("Welcome email sent successfully:", data);
    return { success: true, message: "Welcome email sent!" };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, message: `Failed to send email: ${error.message}` };
  }
}