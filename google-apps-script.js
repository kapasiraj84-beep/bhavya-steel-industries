/**
 * GOOGLE APPS SCRIPT - SERVERLESS BACKEND
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1vsxUQfc88BqiwCKiJ7BryEoBIP-dZFbfsMAGBCIOte0/edit
 * 2. Click "Extensions" → "Apps Script"
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Click "Deploy" → "New deployment"
 * 6. Select type: "Web app"
 * 7. Execute as: "Me"
 * 8. Who has access: "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the Web App URL
 * 11. Update the API_URL in quote-form-backend.js with this URL
 * 
 * NO API KEYS NEEDED! 100% FREE!
 */

// Configuration
const SPREADSHEET_ID = '1vsxUQfc88BqiwCKiJ7BryEoBIP-dZFbfsMAGBCIOte0';
const SHEET_NAME = 'Quote Requests';

// Email configuration (optional - for notifications)
const NOTIFICATION_EMAIL = 'kapasiraj84@gmail.com'; // Your email
const SEND_NOTIFICATIONS = true; // Set to false to disable email notifications

/**
 * Handle POST requests (quote submissions)
 */
function doPost(e) {
  try {
    // Parse request data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.product) {
      return createResponse(false, 'Missing required fields: name, email, phone, product');
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return createResponse(false, 'Invalid email format');
    }
    
    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = data.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return createResponse(false, 'Invalid phone number. Must be 10 digits starting with 6-9');
    }
    
    // Get spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return createResponse(false, 'Sheet not found');
    }
    
    // Prepare data row
    const timestamp = new Date();
    const formattedTimestamp = Utilities.formatDate(timestamp, 'Asia/Kolkata', 'dd/MM/yyyy hh:mm:ss a');
    
    const rowData = [
      formattedTimestamp,
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
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Format the new row
    const lastRow = sheet.getLastRow();
    const range = sheet.getRange(lastRow, 1, 1, 10);
    
    // Alternate row colors
    if (lastRow % 2 === 0) {
      range.setBackground('#f8fafc');
    }
    
    // Add borders
    range.setBorder(true, true, true, true, true, true, '#e2e8f0', SpreadsheetApp.BorderStyle.SOLID);
    
    // Send email notification (optional)
    if (SEND_NOTIFICATIONS && NOTIFICATION_EMAIL) {
      sendNotificationEmail(data, formattedTimestamp);
    }
    
    // Send confirmation email to customer
    sendCustomerConfirmation(data);
    
    // Success response
    return createResponse(true, 'Quote request submitted successfully! We will contact you soon.', {
      timestamp: formattedTimestamp,
      name: data.name,
      email: data.email,
      phone: data.phone,
      product: data.product
    });
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse(false, 'Failed to submit quote request. Please try again or contact us directly.');
  }
}

/**
 * Handle GET requests (health check)
 */
function doGet(e) {
  return createResponse(true, 'Bhavya Steel Industries Quote API is active', {
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      submit: 'POST /',
      health: 'GET /'
    }
  });
}

/**
 * Create JSON response
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Send notification email to admin
 */
function sendNotificationEmail(data, timestamp) {
  try {
    const subject = `🔔 New Quote Request - ${data.product}`;
    
    const htmlBody = `
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
          .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 14px; }
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
              <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}" class="button">View in Google Sheets</a>
            </div>
          </div>
          <div class="footer">
            <p>Bhavya Steel Industries - Automated Quote System</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (error) {
    Logger.log('Email notification error: ' + error.toString());
  }
}

/**
 * Send confirmation email to customer
 */
function sendCustomerConfirmation(data) {
  try {
    const subject = 'Quote Request Received - Bhavya Steel Industries';
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
          .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 14px; }
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
              <p><strong>Address:</strong> Industrial Area, Mumbai, Maharashtra</p>
            </div>
            <p style="margin-top: 20px;">For urgent inquiries, feel free to call us directly.</p>
            <p>Best regards,<br><strong>Bhavya Steel Industries Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (error) {
    Logger.log('Customer confirmation error: ' + error.toString());
  }
}