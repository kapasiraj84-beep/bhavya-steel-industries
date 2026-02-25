/**
 * GOOGLE APPS SCRIPT - VISITOR TRACKING
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open: https://docs.google.com/spreadsheets/d/1vsxUQfc88BqiwCKiJ7BryEoBIP-dZFbfsMAGBCIOte0/edit
 * 2. Click "Extensions" → "Apps Script"
 * 3. Paste this code (replace existing)
 * 4. Click "Deploy" → "New deployment" → "Web app"
 * 5. Execute as: Me
 * 6. Who has access: Anyone
 * 7. Copy deployment URL
 * 8. Update analytics-tracker.js SHEET_URL with deployment URL
 */

const SPREADSHEET_ID = '1vsxUQfc88BqiwCKiJ7BryEoBIP-dZFbfsMAGBCIOte0';
const VISITOR_SHEET = 'Website Visitors';
const QUOTE_SHEET = 'Quote Requests';

// Handle POST requests from website
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.type === 'visitor') {
      logVisitor(data);
    } else if (data.type === 'quote') {
      logQuote(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (test endpoint)
function doGet(e) {
  return ContentService.createTextOutput('✅ Bhavya Steel Analytics is running');
}

// Log visitor data
function logVisitor(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(VISITOR_SHEET);
  
  const timestamp = new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'});
  const visitorId = generateVisitorId(data.userAgent);
  
  sheet.appendRow([
    timestamp,                    // Date & Time
    data.pageUrl || '',          // Page Visited
    data.deviceType || '',       // Device Type
    data.browser || '',          // Browser
    'India',                     // Location (approximate)
    data.referrer || 'Direct',   // Referrer Source
    data.timeOnPage || 0,        // Time on Page (sec)
    data.buttonClicked || '',    // Button Clicked
    visitorId,                   // Visitor ID
    1                            // Total Visits
  ]);
}

// Log quote request
function logQuote(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(QUOTE_SHEET);
  
  const timestamp = new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'});
  
  sheet.appendRow([
    timestamp,
    data.name || '',
    data.email || '',
    data.phone || '',
    data.company || '',
    data.product || '',
    data.quantity || '',
    data.message || '',
    'Website Form'
  ]);
}

// Generate simple visitor ID from user agent
function generateVisitorId(userAgent) {
  if (!userAgent) return 'UNKNOWN';
  
  const hash = userAgent.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return 'V' + Math.abs(hash).toString(16).substring(0, 8).toUpperCase();
}

// Get total visitor count
function getTotalVisitors() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(VISITOR_SHEET);
  return sheet.getLastRow() - 1; // Subtract header row
}

// Get today's visitor count
function getTodayVisitors() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(VISITOR_SHEET);
  const today = new Date().toLocaleDateString('en-IN');
  
  const data = sheet.getDataRange().getValues();
  let count = 0;
  
  for (let i = 1; i < data.length; i++) {
    const rowDate = new Date(data[i][0]).toLocaleDateString('en-IN');
    if (rowDate === today) count++;
  }
  
  return count;
}
