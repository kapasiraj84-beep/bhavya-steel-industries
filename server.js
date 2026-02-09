const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Google Sheets Configuration
const SPREADSHEET_ID = '1vsxUQfc88BqiwCKiJ7BryEoBIP-dZFbfsMAGBCIOte0';
const SHEET_NAME = 'Quote Requests';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'active',
    message: 'Bhavya Steel Industries Quote API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /',
      submitQuote: 'POST /api/quote'
    }
  });
});

// Submit quote request endpoint
app.post('/api/quote', async (req, res) => {
  try {
    const { name, email, phone, company, product, quantity, unit, message } = req.body;

    // Validation
    if (!name || !email || !phone || !product) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone, product'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Phone validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number. Must be 10 digits starting with 6-9'
      });
    }

    // Prepare data for Google Sheets
    const timestamp = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const rowData = [
      timestamp,
      name,
      email,
      phone,
      company || 'N/A',
      product,
      quantity || 'N/A',
      unit || 'N/A',
      message || 'N/A',
      'New'
    ];

    // Append to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:J`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData]
      }
    });

    // Success response
    res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully! We will contact you soon.',
      data: {
        timestamp,
        name,
        email,
        phone,
        product
      }
    });

    console.log(`✅ New quote request from ${name} for ${product}`);

  } catch (error) {
    console.error('❌ Error submitting quote:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit quote request. Please try again or contact us directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bhavya Steel Industries API running on port ${PORT}`);
  console.log(`📊 Connected to Google Sheet: ${SPREADSHEET_ID}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;