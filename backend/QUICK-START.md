# ⚡ QUICK START - 5 Minutes Setup

Choose your preferred setup method:

## 🎯 Option 1: Google Sheets Only (EASIEST - No Database!)

Perfect if you just want to collect quotes in Google Sheets without setting up databases.

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup Google Sheets

1. **Create Google Sheet**
   - Go to https://sheets.google.com
   - Create new sheet: "Bhavya Steel Quotes"
   - Add header row: `Timestamp | Name | Company | Email | Phone | Category | Quantity | Products | Specifications | Location | Required Date | Notes | Status`

2. **Get Sheet ID**
   - Copy from URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`

3. **Create Service Account**
   - Go to https://console.cloud.google.com
   - Create project → Enable Google Sheets API
   - Create Service Account → Download JSON key
   - Share your sheet with service account email

### Step 3: Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3000
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_CREDENTIALS={"type":"service_account","project_id":"...paste entire JSON..."}
EMAIL_USER=bhavyasteelindustries20@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

### Step 4: Run Server
```bash
node google-sheets-only.js
```

**Done! ✅** Your backend is running at `http://localhost:3000`

---

## 🚀 Option 2: Full Backend (MongoDB + MySQL + Google Sheets)

For complete solution with database, analytics, and admin dashboard.

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup Databases

**MongoDB (Choose one):**

**A. Local MongoDB**
```bash
# Install MongoDB
sudo apt-get install mongodb  # Ubuntu
brew install mongodb-community  # macOS

# Start MongoDB
mongod
```

**B. MongoDB Atlas (Cloud - Recommended)**
- Go to https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Add to `.env`: `MONGODB_URI=mongodb+srv://...`

**MySQL:**
```bash
# Install MySQL
sudo apt-get install mysql-server  # Ubuntu
brew install mysql  # macOS

# Create database
mysql -u root -p
CREATE DATABASE bhavya_steel;
exit;
```

### Step 3: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with all your credentials.

### Step 4: Setup Database Tables
```bash
npm run setup-db
```

### Step 5: Run Server
```bash
npm start
```

**Done! ✅** Full backend running at `http://localhost:3000`

---

## 🌐 Deploy to Production (Railway - FREE)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login & Deploy
```bash
railway login
railway init
railway up
```

### Step 3: Add Environment Variables
```bash
railway variables set MONGODB_URI="your_mongodb_uri"
railway variables set EMAIL_USER="bhavyasteelindustries20@gmail.com"
railway variables set EMAIL_PASSWORD="your_app_password"
# ... add all variables
```

**Done! ✅** Your backend is live!

---

## 🔗 Connect Website to Backend

### Update Form in `quote-request.html`

**Replace:**
```html
<form action="https://formspree.io/f/xdkoqpqb" method="POST">
```

**With:**
```html
<form action="https://your-backend-url.railway.app/api/quote" method="POST">
```

**Or use JavaScript for better UX:**
```html
<script>
document.getElementById('quoteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const response = await fetch('https://your-backend-url.railway.app/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    if (response.ok) {
        document.getElementById('successMessage').classList.add('show');
        e.target.reset();
    }
});
</script>
```

---

## 📊 Access Admin Dashboard

Open: `http://your-backend-url.railway.app/admin-dashboard.html`

Features:
- View all quotes
- Update status
- Export to CSV
- Real-time analytics

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB is running: `sudo service mongodb status`
- Or use MongoDB Atlas (cloud)

### "Google Sheets not updating"
- Verify service account has access to sheet
- Check Sheet ID is correct
- Ensure Google Sheets API is enabled

### "Email not sending"
- Use Gmail App Password (not regular password)
- Enable 2-Factor Authentication first
- Get app password: https://myaccount.google.com/apppasswords

---

## 📞 Need Help?

WhatsApp: +91 9409420760 / +91 9327703647
Email: bhavyasteelindustries20@gmail.com

---

**That's it! Your backend is ready! 🎉**