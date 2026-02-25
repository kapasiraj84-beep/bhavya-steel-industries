/**
 * GOOGLE APPS SCRIPT - VISITOR TRACKING FOR BHAVYA STEEL
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open: https://docs.google.com/spreadsheets/d/1RP_PjRzMGpxxo-QcEL80kfx5bse2hJsvo1GVWxVkJ9k/edit
 * 2. Click "Extensions" → "Apps Script"
 * 3. Delete ALL existing code
 * 4. Paste THIS ENTIRE CODE
 * 5. Click "Deploy" → "New deployment"
 * 6. Click gear icon → Select "Web app"
 * 7. Description: "Bhavya Steel Analytics"
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone"
 * 10. Click "Deploy"
 * 11. Copy the Web App URL
 * 12. Paste URL in analytics-tracker.js (line 8)
 */

const SPREADSHEET_ID = '1RP_PjRzMGpxxo-QcEL80kfx5bse2hJsvo1GVWxVkJ9k';
const VISITOR_SHEET = 'Website Visitors';
const ENQUIRY_SHEET = 'Enquiries';

// Handle POST requests from website
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.type === 'visitor') {
      logVisitor(data);
    } else if (data.type === 'enquiry') {
      logEnquiry(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data logged successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (test endpoint)
function doGet(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(VISITOR_SHEET);
  const totalVisitors = sheet.getLastRow() - 1;
  
  return ContentService.createTextOutput(
    '✅ Bhavya Steel Analytics is LIVE!\n\n' +
    'Total Visitors Tracked: ' + totalVisitors + '\n' +
    'Spreadsheet: ' + ss.getUrl()
  );
}

// Log visitor data to "Website Visitors" sheet
function logVisitor(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(VISITOR_SHEET);
  
  const timestamp = new Date();
  const istTime = Utilities.formatDate(timestamp, 'Asia/Kolkata', 'dd/MM/yyyy HH:mm:ss');
  
  // Generate visitor ID from user agent
  const visitorId = generateVisitorId(data.userAgent);
  
  // Generate session ID (unique per visit)
  const sessionId = 'S' + timestamp.getTime().toString(36).toUpperCase();
  
  sheet.appendRow([
    istTime,                      // Timestamp
    data.pageUrl || '',           // Page URL
    data.pageTitle || '',         // Page Title
    data.deviceType || '',        // Device Type
    data.browser || '',           // Browser
    data.screenSize || '',        // Screen Size
    data.location || 'India',     // Location
    data.referrer || 'Direct',    // Referrer
    data.timeOnPage || 0,         // Time on Page (sec)
    data.buttonClicked || '',     // Button Clicked
    visitorId,                    // Visitor ID
    sessionId                     // Session ID
  ]);
  
  Logger.log('Visitor logged: ' + visitorId + ' | Page: ' + data.pageUrl);
}

// Log enquiry data to "Enquiries" sheet
function logEnquiry(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(ENQUIRY_SHEET);
  
  const timestamp = new Date();
  const istTime = Utilities.formatDate(timestamp, 'Asia/Kolkata', 'dd/MM/yyyy HH:mm:ss');
  
  sheet.appendRow([
    istTime,
    data.name || '',
    data.email || '',
    data.phone || '',
    data.company || '',
    data.product || '',
    data.quantity || '',
    data.message || '',
    'Website Form',
    data.source || 'Direct'
  ]);
  
  Logger.log('Enquiry logged: ' + data.name + ' | Product: ' + data.product);
}

// Generate visitor ID from user agent (consistent per device)
function generateVisitorId(userAgent) {
  if (!userAgent) return 'UNKNOWN';
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < userAgent.length; i++) {
    const char = userAgent.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return 'V' + Math.abs(hash).toString(16).substring(0, 8).toUpperCase();
}

// Get analytics summary (can be called from website)
function getAnalyticsSummary() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(VISITOR_SHEET);
  
  const data = sheet.getDataRange().getValues();
  const totalVisitors = data.length - 1; // Exclude header
  
  // Count unique visitors
  const uniqueVisitors = new Set();
  let totalTime = 0;
  
  for (let i = 1; i < data.length; i++) {
    uniqueVisitors.add(data[i][10]); // Visitor ID column
    totalTime += parseFloat(data[i][8]) || 0; // Time on page column
  }
  
  return {
    totalVisitors: totalVisitors,
    uniqueVisitors: uniqueVisitors.size,
    totalTimeMinutes: Math.round(totalTime / 60),
    averageTimeSeconds: totalVisitors > 0 ? Math.round(totalTime / totalVisitors) : 0
  };
}

// Optional: Send daily email report
function sendDailyReport() {
  const summary = getAnalyticsSummary();
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  const emailBody = 
    '📊 Daily Website Analytics - Bhavya Steel Industries\n\n' +
    '👥 Total Visitors: ' + summary.totalVisitors + '\n' +
    '🆔 Unique Visitors: ' + summary.uniqueVisitors + '\n' +
    '⏱️ Total Time Spent: ' + summary.totalTimeMinutes + ' minutes\n' +
    '📈 Average Time per Visit: ' + summary.averageTimeSeconds + ' seconds\n\n' +
    '📊 View Full Report: ' + ss.getUrl();
  
  // Uncomment to enable email reports
  // MailApp.sendEmail('kapasiraj84@gmail.com', '📊 Daily Website Analytics', emailBody);
  
  Logger.log('Daily report generated');
}

// Optional: Set up daily trigger (run this once manually)
function setupDailyTrigger() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create new daily trigger at 11 PM IST
  ScriptApp.newTrigger('sendDailyReport')
    .timeBased()
    .everyDays(1)
    .atHour(23)
    .create();
  
  Logger.log('Daily trigger set up successfully');
}
