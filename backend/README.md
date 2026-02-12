# 🚀 Bhavya Steel Industries - Backend System

Complete backend solution for quote management with MongoDB, MySQL, Google Sheets integration, and email notifications.

## 📋 Features

✅ **Multi-Database Support**
- MongoDB for flexible document storage
- MySQL for relational data and analytics
- Google Sheets for easy viewing and collaboration

✅ **Automated Workflows**
- Email notifications to business owners
- Auto-sync to Google Sheets
- Customer database management
- Product analytics tracking

✅ **Admin Dashboard**
- View all quote requests
- Update quote status
- Filter and search quotes
- Export to CSV/Excel
- Real-time analytics

✅ **API Endpoints**
- RESTful API for quote management
- Secure authentication
- Rate limiting
- CORS enabled

---

## 🛠️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/kapasiraj84-beep/bhavya-steel-industries.git
cd bhavya-steel-industries/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file with your credentials:
```env
# MongoDB (Choose one)
MONGODB_URI=mongodb://localhost:27017/bhavya-steel
# OR MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bhavya-steel

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=bhavya_steel

# Email (Gmail)
EMAIL_USER=bhavyasteelindustries20@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# Google Sheets
GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_CREDENTIALS={"type":"service_account",...}
```

### 4. Setup Database
```bash
npm run setup-db
```

### 5. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

Server will run on: `http://localhost:3000`

---

## 📊 Google Sheets Setup

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet: "Bhavya Steel Industries - Quotes"
3. Create sheets: "Quote Requests", "Customer Database", "Product Analytics"
4. Copy the Sheet ID from URL

### Step 2: Enable Google Sheets API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable "Google Sheets API"
4. Create Service Account
5. Download JSON credentials
6. Share your Google Sheet with service account email

### Step 3: Configure Backend
Add to `.env`:
```env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_CREDENTIALS={"type":"service_account","project_id":"..."}
```

---

## 📧 Email Setup (Gmail)

### Step 1: Enable 2-Factor Authentication
1. Go to Google Account settings
2. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Other (Custom name)"
3. Name it: "Bhavya Steel Backend"
4. Copy the 16-character password

### Step 3: Configure Backend
Add to `.env`:
```env
EMAIL_USER=bhavyasteelindustries20@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
```

---

## 🗄️ Database Setup

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Start MongoDB
mongod
```

**Option 2: MongoDB Atlas (Cloud - Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP: 0.0.0.0/0 (or your server IP)
5. Get connection string
6. Add to `.env`: `MONGODB_URI=mongodb+srv://...`

### MySQL Setup

**Install MySQL**
```bash
# Ubuntu/Debian
sudo apt-get install mysql-server

# macOS
brew install mysql

# Start MySQL
sudo service mysql start
```

**Create Database**
```bash
mysql -u root -p
CREATE DATABASE bhavya_steel;
exit;
```

**Run Setup Script**
```bash
npm run setup-db
```

---

## 🌐 Deployment Options

### Option 1: Railway (Recommended - Free)

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login to Railway**
```bash
railway login
```

3. **Initialize Project**
```bash
railway init
```

4. **Add Environment Variables**
```bash
railway variables set MONGODB_URI="your_mongodb_uri"
railway variables set MYSQL_HOST="your_mysql_host"
# ... add all variables
```

5. **Deploy**
```bash
railway up
```

### Option 2: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login and Create App**
```bash
heroku login
heroku create bhavya-steel-backend
```

3. **Add MongoDB**
```bash
heroku addons:create mongolab:sandbox
```

4. **Add MySQL**
```bash
heroku addons:create jawsdb:kitefin
```

5. **Set Environment Variables**
```bash
heroku config:set EMAIL_USER="bhavyasteelindustries20@gmail.com"
heroku config:set EMAIL_PASSWORD="your_app_password"
# ... add all variables
```

6. **Deploy**
```bash
git push heroku main
```

### Option 3: VPS (DigitalOcean, AWS, etc.)

1. **SSH into server**
```bash
ssh root@your_server_ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install MongoDB & MySQL**
```bash
sudo apt-get install mongodb mysql-server
```

4. **Clone and Setup**
```bash
git clone https://github.com/kapasiraj84-beep/bhavya-steel-industries.git
cd bhavya-steel-industries/backend
npm install
npm run setup-db
```

5. **Use PM2 for Process Management**
```bash
npm install -g pm2
pm2 start server.js --name bhavya-backend
pm2 startup
pm2 save
```

---

## 🔗 Connect Website to Backend

### Update Form Action

Edit `quote-request.html`:

**Current (Formspree):**
```html
<form action="https://formspree.io/f/xdkoqpqb" method="POST">
```

**New (Your Backend):**
```html
<form action="https://your-backend-url.com/api/quote" method="POST">
```

**Or use JavaScript for better UX:**
```html
<form id="quoteForm">
  <!-- form fields -->
</form>

<script>
document.getElementById('quoteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('https://your-backend-url.com/api/quote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Quote submitted successfully!');
            e.target.reset();
        }
    } catch (error) {
        alert('Error submitting quote');
    }
});
</script>
```

---

## 📊 Admin Dashboard

Access at: `http://your-backend-url.com/admin-dashboard.html`

**Features:**
- View all quotes
- Filter by status, date, search
- Update quote status
- Export to CSV
- Real-time analytics

---

## 🔌 API Endpoints

### Quote Management

**Submit Quote**
```
POST /api/quote
Body: { name, email, phone, category, ... }
```

**Get All Quotes**
```
GET /api/quotes?page=1&limit=20&status=pending
```

**Get Single Quote**
```
GET /api/quotes/:id
```

**Update Quote Status**
```
PATCH /api/quotes/:id/status
Body: { status: "contacted" }
```

**Analytics**
```
GET /api/analytics
```

**Export CSV**
```
GET /api/export
```

---

## 🔒 Security Best Practices

1. **Never commit `.env` file**
2. **Use strong passwords**
3. **Enable HTTPS in production**
4. **Implement rate limiting**
5. **Add authentication for admin routes**
6. **Whitelist IPs for database access**
7. **Regular backups**

---

## 📈 Monitoring & Maintenance

### Check Server Status
```bash
curl http://localhost:3000/api/health
```

### View Logs
```bash
# PM2
pm2 logs bhavya-backend

# Railway
railway logs

# Heroku
heroku logs --tail
```

### Database Backups

**MongoDB**
```bash
mongodump --uri="mongodb://..." --out=backup/
```

**MySQL**
```bash
mysqldump -u root -p bhavya_steel > backup.sql
```

---

## 🆘 Troubleshooting

### MongoDB Connection Error
- Check MongoDB is running: `sudo service mongodb status`
- Verify connection string in `.env`
- Check firewall rules

### MySQL Connection Error
- Check MySQL is running: `sudo service mysql status`
- Verify credentials in `.env`
- Run setup script: `npm run setup-db`

### Email Not Sending
- Verify Gmail App Password
- Check 2FA is enabled
- Test with: `node -e "require('./server.js')"`

### Google Sheets Not Updating
- Verify service account has access
- Check Sheet ID is correct
- Ensure API is enabled

---

## 📞 Support

For issues or questions:
- Email: bhavyasteelindustries20@gmail.com
- WhatsApp: +91 9409420760 / +91 9327703647

---

## 📄 License

MIT License - Free to use and modify

---

**Made with ❤️ for Bhavya Steel Industries**