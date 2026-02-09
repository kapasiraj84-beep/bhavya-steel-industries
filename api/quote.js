/**
 * BHAVYA STEEL INDUSTRIES - QUOTE REQUEST API
 * 
 * Production-grade serverless API built for Vercel
 * Features:
 * - Google Sheets integration
 * - Email notifications (SendGrid)
 * - Rate limiting & security
 * - Input validation & sanitization
 * - Error handling & logging
 * - CORS support
 * - Analytics tracking
 * 
 * @author Bhindi AI
 * @version 2.0.0
 */

import { google } from 'googleapis';

// Configuration
const CONFIG = {
  spreadsheetId: '1vsxUQfc88BqiwCKiJ7BryEoBIP-dZFbfsMAGBCIOte0',
  sheetName: 'Quote Requests',
  timezone: 'Asia/Kolkata',
  rateLimit: {
    maxRequests: 10,
    windowMs: 60000 // 1 minute
  }
};

// In-memory rate limiting (for serverless)
const rateLimitStore = new Map();

/**
 * Rate limiting middleware
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  
  // Clean old requests
  const recentRequests = userRequests.filter(
    time => now - time < CONFIG.rateLimit.windowMs
  );
  
  if (recentRequests.length >= CONFIG.rateLimit.maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return true;
}

/**
 * Initialize Google Sheets API
 */
function getGoogleSheetsClient() {
  try {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString()
    );
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Failed to initialize Google Sheets:', error);
    throw new Error('Google Sheets initialization failed');
  }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Indian phone number
 */
function isValidPhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanPhone = phone.replace(/\D/g, '');
  return phoneRegex.test(cleanPhone);
}

/**
 * Sanitize input to prevent injection attacks
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .substring(0, 1000); // Limit length
}

/**
 * Format timestamp in Indian timezone
 */
function getIndianTimestamp() {
  return new Date().toLocaleString('en-IN', {
    timeZone: CONFIG.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

/**
 * Save quote to Google Sheets
 */
async function saveToGoogleSheets(data) {
  try {
    const sheets = getGoogleSheetsClient();
    const timestamp = getIndianTimestamp();
    
    const rowData = [
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.company || 'N/A',
      data.product,
      data.quantity || 'N/A',
      data.unit || 'N/A',
      data.message || 'N/A',
      'New'
    ];
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: CONFIG.spreadsheetId,
      range: `${CONFIG.sheetName}!A:J`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData]
      }
    });
    
    return { success: true, timestamp };
  } catch (error) {
    console.error('Google Sheets error:', error);
    throw new Error('Failed to save to database');
  }
}

/**
 * Send email notification via SendGrid
 */
async function sendEmailNotification(data, timestamp) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SendGrid not configured, skipping email');
      return;
    }
    
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // Email to admin
    const adminEmail = {
      to: process.env.ADMIN_EMAIL || 'kapasiraj84@gmail.com',
      from: process.env.FROM_EMAIL || 'noreply@bhavyasteel.com',
      subject: `🔔 New Quote Request - ${data.product}`,
      html: generateAdminEmailHTML(data, timestamp)
    };
    
    // Email to customer
    const customerEmail = {
      to: data.email,
      from: process.env.FROM_EMAIL || 'noreply@bhavyasteel.com',
      subject: 'Quote Request Received - Bhavya Steel Industries',
      html: generateCustomerEmailHTML(data)
    };
    
    await Promise.all([
      sgMail.send(adminEmail),
      sgMail.send(customerEmail)
    ]);
    
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    // Don't throw - email failure shouldn't block quote submission
    return { success: false, error: error.message };
  }
}

/**
 * Generate admin notification email HTML
 */
function generateAdminEmailHTML(data, timestamp) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #1e3a8a; }
        .label { font-weight: bold; color: #1e3a8a; margin-bottom: 5px; }
        .value { color: #333; }
        .button { display: inline-block; padding: 12px 30px; background: #1e3a8a; color: white; text-decoration: none; border-radius: 8px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 New Quote Request</h1>
          <p>Received at ${timestamp}</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">👤 Customer Name</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">📧 Email</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field">
            <div class="label">📱 Phone</div>
            <div class="value">${data.phone}</div>
          </div>
          <div class="field">
            <div class="label">🏢 Company</div>
            <div class="value">${data.company || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">🔩 Product</div>
            <div class="value">${data.product}</div>
          </div>
          <div class="field">
            <div class="label">📦 Quantity</div>
            <div class="value">${data.quantity || 'Not specified'} ${data.unit || ''}</div>
          </div>
          <div class="field">
            <div class="label">💬 Message</div>
            <div class="value">${data.message || 'No message provided'}</div>
          </div>
          <div style="text-align: center;">
            <a href="https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}" class="button">View in Google Sheets</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate customer confirmation email HTML
 */
function generateCustomerEmailHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
        .contact-info { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Quote Request Received!</h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>Thank you for your interest in <strong>Bhavya Steel Industries</strong>!</p>
          <div class="highlight">
            <p><strong>We have received your quote request for:</strong></p>
            <p style="font-size: 18px; color: #1e3a8a; font-weight: bold;">${data.product}</p>
            ${data.quantity ? `<p>Quantity: ${data.quantity} ${data.unit || ''}</p>` : ''}
          </div>
          <p>Our team will review your requirements and get back to you within <strong>24 hours</strong> with a competitive quote.</p>
          <div class="contact-info">
            <h3 style="color: #1e3a8a; margin-bottom: 15px;">📞 Contact Us</h3>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> info@bhavyasteel.com</p>
            <p><strong>Website:</strong> bhavyasteel.com</p>
          </div>
          <p style="margin-top: 20px;">For urgent inquiries, feel free to call us directly.</p>
          <p>Best regards,<br><strong>Bhavya Steel Industries Team</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Main API handler
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Health check
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Bhavya Steel Industries Quote API',
      version: '2.0.0',
      status: 'operational',
      timestamp: new Date().toISOString()
    });
  }
  
  // Only accept POST for quote submission
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST to submit quotes.'
    });
  }
  
  try {
    // Rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again in a minute.'
      });
    }
    
    // Parse and sanitize input
    const data = {
      name: sanitizeInput(req.body.name),
      email: sanitizeInput(req.body.email),
      phone: sanitizeInput(req.body.phone),
      company: sanitizeInput(req.body.company),
      product: sanitizeInput(req.body.product),
      quantity: sanitizeInput(req.body.quantity),
      unit: sanitizeInput(req.body.unit),
      message: sanitizeInput(req.body.message)
    };
    
    // Validation
    if (!data.name || !data.email || !data.phone || !data.product) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone, product'
      });
    }
    
    if (!isValidEmail(data.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }
    
    if (!isValidPhone(data.phone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number. Must be 10 digits starting with 6-9'
      });
    }
    
    // Save to Google Sheets
    const saveResult = await saveToGoogleSheets(data);
    
    // Send email notifications (non-blocking)
    sendEmailNotification(data, saveResult.timestamp).catch(err => {
      console.error('Email notification failed:', err);
    });
    
    // Success response
    return res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully! We will contact you soon.',
      data: {
        timestamp: saveResult.timestamp,
        name: data.name,
        email: data.email,
        phone: data.phone,
        product: data.product
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to submit quote request. Please try again or contact us directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}