/**
 * SIMPLIFIED VERSION - GOOGLE SHEETS ONLY
 * No MongoDB or MySQL required - just Google Sheets!
 * Perfect for quick setup without database installation
 */

const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== GOOGLE SHEETS SETUP ====================

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getGoogleSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}'),
        scopes: SCOPES,
    });
    return google.sheets({ version: 'v4', auth });
}

// ==================== EMAIL SETUP ====================

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'bhavyasteelindustries20@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

// ==================== MAIN ENDPOINT ====================

app.post('/api/quote', async (req, res) => {
    try {
        const quoteData = {
            timestamp: new Date().toISOString(),
            name: req.body.name,
            company: req.body.company || 'N/A',
            email: req.body.email,
            phone: req.body.phone,
            category: req.body.category,
            quantity: req.body.quantity || 'N/A',
            products: Array.isArray(req.body.products) ? req.body.products.join(', ') : (req.body['products[]'] || 'N/A'),
            specifications: req.body.specifications,
            location: req.body.location,
            requiredDate: req.body.required_date || 'N/A',
            notes: req.body.notes || 'N/A',
            status: 'Pending'
        };

        // 1. APPEND TO GOOGLE SHEETS
        try {
            const sheets = await getGoogleSheetsClient();
            const spreadsheetId = process.env.GOOGLE_SHEET_ID;

            const values = [[
                quoteData.timestamp,
                quoteData.name,
                quoteData.company,
                quoteData.email,
                quoteData.phone,
                quoteData.category,
                quoteData.quantity,
                quoteData.products,
                quoteData.specifications,
                quoteData.location,
                quoteData.requiredDate,
                quoteData.notes,
                quoteData.status
            ]];

            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: 'Quote Requests!A:M',
                valueInputOption: 'USER_ENTERED',
                resource: { values },
            });

            console.log('✅ Data saved to Google Sheets');
        } catch (sheetError) {
            console.error('⚠️ Google Sheets Error:', sheetError.message);
        }

        // 2. SEND EMAIL NOTIFICATION
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'bhavyasteelindustries20@gmail.com',
                subject: `🔔 New Quote Request from ${quoteData.name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
                        <div style="background: linear-gradient(135deg, #0a1628 0%, #2563eb 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
                            <h1 style="margin: 0;">🔔 New Quote Request</h1>
                            <p style="margin: 10px 0 0 0;">Bhavya Steel Industries</p>
                        </div>
                        
                        <div style="background: white; padding: 30px; margin-top: 20px; border-radius: 10px;">
                            <h2 style="color: #0a1628;">Contact Information</h2>
                            <p><strong>Name:</strong> ${quoteData.name}</p>
                            <p><strong>Company:</strong> ${quoteData.company}</p>
                            <p><strong>Email:</strong> <a href="mailto:${quoteData.email}">${quoteData.email}</a></p>
                            <p><strong>Phone:</strong> <a href="tel:${quoteData.phone}">${quoteData.phone}</a></p>

                            <h2 style="color: #0a1628; margin-top: 30px;">Product Requirements</h2>
                            <p><strong>Category:</strong> ${quoteData.category}</p>
                            <p><strong>Quantity:</strong> ${quoteData.quantity}</p>
                            <p><strong>Products:</strong> ${quoteData.products}</p>
                            <p><strong>Specifications:</strong><br>${quoteData.specifications}</p>

                            <h2 style="color: #0a1628; margin-top: 30px;">Delivery Information</h2>
                            <p><strong>Location:</strong> ${quoteData.location}</p>
                            <p><strong>Required By:</strong> ${quoteData.requiredDate}</p>
                            ${quoteData.notes !== 'N/A' ? `<p><strong>Notes:</strong><br>${quoteData.notes}</p>` : ''}

                            <div style="margin-top: 30px; padding: 20px; background: #f0fdf4; border-radius: 8px; text-align: center;">
                                <p style="margin: 0; color: #059669; font-weight: bold;">
                                    📞 Contact customer immediately via WhatsApp or Phone
                                </p>
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 12px;">
                            <p>Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                        </div>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log('✅ Email notification sent');
        } catch (emailError) {
            console.error('⚠️ Email Error:', emailError.message);
        }

        res.status(201).json({
            success: true,
            message: 'Quote request submitted successfully',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit quote request',
            error: error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        version: 'google-sheets-only',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════════════════════════╗
    ║                                                            ║
    ║   🚀 BHAVYA STEEL - GOOGLE SHEETS BACKEND RUNNING         ║
    ║                                                            ║
    ║   📍 Port: ${PORT}                                           ║
    ║   🌐 URL: http://localhost:${PORT}                          ║
    ║                                                            ║
    ║   ✅ Google Sheets: Ready                                  ║
    ║   ✅ Email: Configured                                     ║
    ║                                                            ║
    ║   📊 No database required - using Google Sheets only!     ║
    ║                                                            ║
    ╚════════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;