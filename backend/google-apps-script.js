/**
 * BHAVYA STEEL INDUSTRIES - QUOTE MANAGEMENT BACKEND
 * Google Apps Script for automatic Excel/Sheets data entry
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1q7Nb9kYhkWzC_7UcyIPmY6rfw1q-2jQWKYDp9j0PWK4/edit
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Click "Deploy" → "New deployment"
 * 6. Select type: "Web app"
 * 7. Execute as: "Me"
 * 8. Who has access: "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the Web App URL
 * 11. Update quote-request.html form action to this URL
 */

// Configuration
const SPREADSHEET_ID = '1q7Nb9kYhkWzC_7UcyIPmY6rfw1q-2jQWKYDp9j0PWK4';
const SHEET_NAME = 'Quote Requests';
const EMAIL_RECIPIENTS = ['bhavyasteelindustries20@gmail.com', 'kapasiraj84@gmail.com'];

/**
 * Handle POST requests from the quote form
 */
function doPost(e) {
  try {
    // Parse form data
    const formData = parseFormData(e);
    
    // Validate required fields
    if (!validateFormData(formData)) {
      return createResponse(false, 'Missing required fields');
    }
    
    // Add to Google Sheet
    const rowAdded = addToSheet(formData);
    
    if (rowAdded) {
      // Send email notification
      sendEmailNotification(formData);
      
      // Return success response
      return createResponse(true, 'Quote request submitted successfully!');
    } else {
      return createResponse(false, 'Failed to save data');
    }
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'active',
      message: 'Bhavya Steel Industries Quote Backend is running',
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Parse form data from POST request
 */
function parseFormData(e) {
  const params = e.parameter;
  
  return {
    timestamp: new Date(),
    name: params.name || '',
    company: params.company || '',
    email: params.email || '',
    phone: params.phone || '',
    category: params.category || '',
    quantity: params.quantity || '',
    products: params.products || '',
    specifications: params.specifications || '',
    location: params.location || '',
    requiredDate: params.required_date || '',
    notes: params.notes || '',
    status: 'New',
    followUpDate: '',
    quoteSent: 'No',
    internalNotes: ''
  };
}

/**
 * Validate required form fields
 */
function validateFormData(data) {
  const required = ['name', 'email', 'phone', 'category', 'specifications', 'location'];
  
  for (let field of required) {
    if (!data[field] || data[field].trim() === '') {
      Logger.log('Missing required field: ' + field);
      return false;
    }
  }
  
  return true;
}

/**
 * Add form data to Google Sheet
 */
function addToSheet(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      Logger.log('Sheet not found: ' + SHEET_NAME);
      return false;
    }
    
    // Prepare row data
    const rowData = [
      data.timestamp,
      data.name,
      data.company,
      data.email,
      data.phone,
      data.category,
      data.quantity,
      data.products,
      data.specifications,
      data.location,
      data.requiredDate,
      data.notes,
      data.status,
      data.followUpDate,
      data.quoteSent,
      data.internalNotes
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Format the new row
    const lastRow = sheet.getLastRow();
    
    // Alternate row colors for better readability
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, 16).setBackground('#f8fafc');
    }
    
    // Set status cell color based on value
    const statusCell = sheet.getRange(lastRow, 13);
    statusCell.setBackground('#fef3c7').setFontWeight('bold');
    
    Logger.log('Successfully added row ' + lastRow);
    return true;
    
  } catch (error) {
    Logger.log('Error adding to sheet: ' + error.toString());
    return false;
  }
}

/**
 * Send email notification to business owners
 */
function sendEmailNotification(data) {
  try {
    const subject = '🔔 New Quote Request - ' + data.name + ' - ' + data.category;
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0; }
          .label { font-weight: 600; color: #64748b; font-size: 13px; }
          .value { color: #0f172a; font-size: 15px; margin-top: 5px; }
          .highlight { background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          .btn { display: inline-block; background: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 New Quote Request</h1>
            <p>Bhavya Steel Industries</p>
          </div>
          <div class="content">
            <div class="highlight">
              <strong>⚡ ACTION REQUIRED:</strong> A customer has requested a quote. Please review and respond within 24 hours.
            </div>
            
            <div class="section">
              <h3>👤 Contact Information</h3>
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
              <div class="label">Company:</div>
              <div class="value">${data.company || 'Not provided'}</div>
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
              <div class="label">Phone:</div>
              <div class="value">${data.phone}</div>
            </div>
            
            <div class="section">
              <h3>🏭 Product Requirements</h3>
              <div class="label">Category:</div>
              <div class="value">${data.category}</div>
              <div class="label">Quantity:</div>
              <div class="value">${data.quantity || 'Not specified'}</div>
              <div class="label">Specific Products:</div>
              <div class="value">${data.products || 'Not specified'}</div>
              <div class="label">Specifications:</div>
              <div class="value" style="background: #f8fafc; padding: 10px; border-radius: 4px;">${data.specifications}</div>
            </div>
            
            <div class="section">
              <h3>🚚 Delivery Information</h3>
              <div class="label">Location:</div>
              <div class="value">${data.location}</div>
              <div class="label">Required By:</div>
              <div class="value">${data.requiredDate || 'Not specified'}</div>
              <div class="label">Additional Notes:</div>
              <div class="value">${data.notes || 'None'}</div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}" class="btn">📊 View in Spreadsheet</a>
              <a href="mailto:${data.email}" class="btn" style="background: #10b981;">📧 Reply to Customer</a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #64748b; font-size: 13px;">
              <p><strong>Bhavya Steel Industries</strong><br>
              Plot No: 335/B, Chamunda Chawl, Naroda, NH-8, Ahmedabad<br>
              GST: 24AWIPK1900F1Z1</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Send to all recipients
    EMAIL_RECIPIENTS.forEach(recipient => {
      MailApp.sendEmail({
        to: recipient,
        subject: subject,
        htmlBody: htmlBody,
        replyTo: data.email,
        name: 'Bhavya Steel Website'
      });
    });
    
    Logger.log('Email notifications sent successfully');
    
  } catch (error) {
    Logger.log('Error sending email: ' + error.toString());
  }
}

/**
 * Create JSON response
 */
function createResponse(success, message) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - Run this to verify setup
 */
function testSetup() {
  Logger.log('Testing Google Apps Script setup...');
  
  // Test spreadsheet access
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('✅ Spreadsheet access: OK');
    Logger.log('Spreadsheet name: ' + ss.getName());
    
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (sheet) {
      Logger.log('✅ Sheet access: OK');
      Logger.log('Sheet name: ' + sheet.getName());
      Logger.log('Last row: ' + sheet.getLastRow());
    } else {
      Logger.log('❌ Sheet not found: ' + SHEET_NAME);
    }
  } catch (error) {
    Logger.log('❌ Spreadsheet access error: ' + error.toString());
  }
  
  // Test email
  try {
    MailApp.sendEmail({
      to: EMAIL_RECIPIENTS[0],
      subject: 'Test - Quote Backend Setup',
      body: 'This is a test email from your quote management backend. Setup is working correctly!'
    });
    Logger.log('✅ Email test: OK');
  } catch (error) {
    Logger.log('❌ Email error: ' + error.toString());
  }
  
  Logger.log('Test complete!');
}
