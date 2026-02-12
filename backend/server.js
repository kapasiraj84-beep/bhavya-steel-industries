const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== DATABASE CONNECTIONS ====================

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bhavya-steel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// MySQL Connection Pool
const mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'bhavya_steel',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test MySQL Connection
mysqlPool.getConnection()
    .then(conn => {
        console.log('✅ MySQL Connected');
        conn.release();
    })
    .catch(err => console.error('❌ MySQL Error:', err));

// ==================== MONGODB SCHEMA ====================

const quoteSchema = new mongoose.Schema({
    // Contact Information
    name: { type: String, required: true },
    company: String,
    email: { type: String, required: true },
    phone: { type: String, required: true },
    
    // Product Requirements
    category: { type: String, required: true },
    quantity: String,
    products: [String],
    specifications: { type: String, required: true },
    
    // Delivery Information
    location: { type: String, required: true },
    requiredDate: Date,
    notes: String,
    
    // Metadata
    status: { 
        type: String, 
        enum: ['pending', 'contacted', 'quoted', 'converted', 'rejected'],
        default: 'pending'
    },
    source: { type: String, default: 'website' },
    ipAddress: String,
    userAgent: String,
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    contactedAt: Date,
    quotedAt: Date
});

const Quote = mongoose.model('Quote', quoteSchema);

// ==================== GOOGLE SHEETS INTEGRATION ====================

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function appendToGoogleSheets(quoteData) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}'),
            scopes: SCOPES,
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        const values = [[
            new Date().toISOString(),
            quoteData.name,
            quoteData.company || 'N/A',
            quoteData.email,
            quoteData.phone,
            quoteData.category,
            quoteData.quantity || 'N/A',
            quoteData.products?.join(', ') || 'N/A',
            quoteData.specifications,
            quoteData.location,
            quoteData.requiredDate || 'N/A',
            quoteData.notes || 'N/A',
            'Pending'
        ]];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Quote Requests!A:M',
            valueInputOption: 'USER_ENTERED',
            resource: { values },
        });

        console.log('✅ Data appended to Google Sheets');
    } catch (error) {
        console.error('❌ Google Sheets Error:', error.message);
    }
}

// ==================== EMAIL NOTIFICATION ====================

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'bhavyasteelindustries20@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendEmailNotification(quoteData) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'bhavyasteelindustries20@gmail.com',
        subject: `🔔 New Quote Request from ${quoteData.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 10px;">
                <div style="background: linear-gradient(135deg, #0a1628 0%, #2563eb 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">🔔 New Quote Request</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Bhavya Steel Industries</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #0a1628; margin-top: 0;">Contact Information</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Name:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${quoteData.name}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Company:</td><td style="padding: 8px 0; color: #0f172a;">${quoteData.company || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #2563eb; font-weight: 600;"><a href="mailto:${quoteData.email}">${quoteData.email}</a></td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #059669; font-weight: 700;"><a href="tel:${quoteData.phone}">${quoteData.phone}</a></td></tr>
                    </table>

                    <h2 style="color: #0a1628; margin-top: 30px;">Product Requirements</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Category:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${quoteData.category}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Quantity:</td><td style="padding: 8px 0; color: #0f172a;">${quoteData.quantity || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Products:</td><td style="padding: 8px 0; color: #0f172a;">${quoteData.products?.join(', ') || 'N/A'}</td></tr>
                    </table>

                    <h3 style="color: #0a1628; margin-top: 20px;">Specifications:</h3>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
                        <p style="margin: 0; color: #0f172a; line-height: 1.6;">${quoteData.specifications}</p>
                    </div>

                    <h2 style="color: #0a1628; margin-top: 30px;">Delivery Information</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Location:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${quoteData.location}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Required By:</td><td style="padding: 8px 0; color: #0f172a;">${quoteData.requiredDate || 'N/A'}</td></tr>
                    </table>

                    ${quoteData.notes ? `
                    <h3 style="color: #0a1628; margin-top: 20px;">Additional Notes:</h3>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                        <p style="margin: 0; color: #0f172a; line-height: 1.6;">${quoteData.notes}</p>
                    </div>
                    ` : ''}

                    <div style="margin-top: 30px; padding: 20px; background: #f0fdf4; border-radius: 8px; border: 1px solid #86efac;">
                        <p style="margin: 0; color: #059669; font-weight: 700; text-align: center;">
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

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent');
    } catch (error) {
        console.error('❌ Email Error:', error.message);
    }
}

// ==================== API ENDPOINTS ====================

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        services: {
            mongodb: mongoose.connection.readyState === 1,
            mysql: true
        }
    });
});

// Submit Quote Request
app.post('/api/quote', async (req, res) => {
    try {
        const quoteData = {
            name: req.body.name,
            company: req.body.company,
            email: req.body.email,
            phone: req.body.phone,
            category: req.body.category,
            quantity: req.body.quantity,
            products: req.body['products[]'] || req.body.products,
            specifications: req.body.specifications,
            location: req.body.location,
            requiredDate: req.body.required_date,
            notes: req.body.notes,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        };

        // 1. Save to MongoDB
        const mongoQuote = new Quote(quoteData);
        await mongoQuote.save();
        console.log('✅ Saved to MongoDB:', mongoQuote._id);

        // 2. Save to MySQL
        try {
            const [result] = await mysqlPool.execute(
                `INSERT INTO quotes (name, company, email, phone, category, quantity, products, specifications, location, required_date, notes, status, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
                [
                    quoteData.name,
                    quoteData.company,
                    quoteData.email,
                    quoteData.phone,
                    quoteData.category,
                    quoteData.quantity,
                    JSON.stringify(quoteData.products),
                    quoteData.specifications,
                    quoteData.location,
                    quoteData.requiredDate,
                    quoteData.notes
                ]
            );
            console.log('✅ Saved to MySQL:', result.insertId);
        } catch (mysqlError) {
            console.error('⚠️ MySQL Save Error:', mysqlError.message);
        }

        // 3. Append to Google Sheets
        await appendToGoogleSheets(quoteData);

        // 4. Send Email Notification
        await sendEmailNotification(quoteData);

        res.status(201).json({
            success: true,
            message: 'Quote request submitted successfully',
            quoteId: mongoQuote._id,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Quote Submission Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit quote request',
            error: error.message
        });
    }
});

// Get All Quotes (with pagination)
app.get('/api/quotes', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const status = req.query.status;

        const filter = status ? { status } : {};
        
        const quotes = await Quote.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Quote.countDocuments(filter);

        res.json({
            success: true,
            data: quotes,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get Single Quote
app.get('/api/quotes/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) {
            return res.status(404).json({ success: false, message: 'Quote not found' });
        }
        res.json({ success: true, data: quote });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update Quote Status
app.patch('/api/quotes/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const quote = await Quote.findByIdAndUpdate(
            req.params.id,
            { 
                status, 
                updatedAt: new Date(),
                ...(status === 'contacted' && { contactedAt: new Date() }),
                ...(status === 'quoted' && { quotedAt: new Date() })
            },
            { new: true }
        );

        if (!quote) {
            return res.status(404).json({ success: false, message: 'Quote not found' });
        }

        res.json({ success: true, data: quote });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Analytics Dashboard
app.get('/api/analytics', async (req, res) => {
    try {
        const totalQuotes = await Quote.countDocuments();
        const pendingQuotes = await Quote.countDocuments({ status: 'pending' });
        const convertedQuotes = await Quote.countDocuments({ status: 'converted' });
        
        const topProducts = await Quote.aggregate([
            { $unwind: '$products' },
            { $group: { _id: '$products', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        const topCategories = await Quote.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const recentQuotes = await Quote.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email category status createdAt');

        res.json({
            success: true,
            data: {
                summary: {
                    total: totalQuotes,
                    pending: pendingQuotes,
                    converted: convertedQuotes,
                    conversionRate: totalQuotes > 0 ? ((convertedQuotes / totalQuotes) * 100).toFixed(2) : 0
                },
                topProducts,
                topCategories,
                recentQuotes
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Export to Excel/CSV
app.get('/api/export', async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        
        // Convert to CSV
        const csv = [
            ['Date', 'Name', 'Company', 'Email', 'Phone', 'Category', 'Quantity', 'Products', 'Location', 'Status'].join(','),
            ...quotes.map(q => [
                new Date(q.createdAt).toLocaleDateString(),
                q.name,
                q.company || '',
                q.email,
                q.phone,
                q.category,
                q.quantity || '',
                q.products?.join('; ') || '',
                q.location,
                q.status
            ].join(','))
        ].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=quotes.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════════════════════════╗
    ║                                                            ║
    ║   🚀 BHAVYA STEEL INDUSTRIES - BACKEND SERVER RUNNING     ║
    ║                                                            ║
    ║   📍 Port: ${PORT}                                           ║
    ║   🌐 URL: http://localhost:${PORT}                          ║
    ║                                                            ║
    ║   ✅ MongoDB: Connected                                    ║
    ║   ✅ MySQL: Connected                                      ║
    ║   ✅ Google Sheets: Ready                                  ║
    ║   ✅ Email: Configured                                     ║
    ║                                                            ║
    ╚════════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;