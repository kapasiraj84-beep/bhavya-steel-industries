# 🚀 BHAVYA STEEL INDUSTRIES - COMPLETE SETUP GUIDE

## 📋 SYSTEM OVERVIEW

Your website now has:
- ✅ **Custom Domain Ready**: www.bhavyasteelindustries.com
- ✅ **Auto-Excel Backend**: Google Sheets automatically captures all quotes
- ✅ **Email Notifications**: Instant alerts when quotes arrive
- ✅ **Professional Design**: World-class UI/UX
- ✅ **Mobile Responsive**: Perfect on all devices
- ✅ **Zero Monthly Cost**: Completely free hosting

---

## 🌐 PART 1: CUSTOM DOMAIN SETUP

### Step 1: Purchase Domain

**Option A: GoDaddy (Recommended)**
1. Go to: https://www.godaddy.com
2. Search: `bhavyasteelindustries.com`
3. Add to cart and purchase (~₹500-800/year)
4. Complete payment

**Option B: Namecheap**
1. Go to: https://www.namecheap.com
2. Search: `bhavyasteelindustries.com`
3. Purchase (~$8-10/year)

**Option C: Google Domains**
1. Go to: https://domains.google.com
2. Search and purchase

---

### Step 2: Configure DNS Settings

After purchasing, go to your domain provider's DNS management and add these records:

#### **A Records** (Point to GitHub Pages)
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### **CNAME Record** (For www subdomain)
```
Type: CNAME
Name: www
Value: kapasiraj84-beep.github.io
TTL: 3600
```

---

### Step 3: Wait for DNS Propagation

- **Time Required**: 24-48 hours (usually faster, 2-6 hours)
- **Check Status**: https://www.whatsmydns.net
- Enter: `bhavyasteelindustries.com`
- Should show GitHub Pages IPs globally

---

### Step 4: Enable HTTPS (Automatic)

Once DNS propagates:
1. Go to: https://github.com/kapasiraj84-beep/bhavya-steel-industries/settings/pages
2. GitHub will automatically provision SSL certificate
3. Check "Enforce HTTPS" (appears after SSL is ready)
4. Your site will be secure: https://www.bhavyasteelindustries.com

---

## 📊 PART 2: GOOGLE SHEETS AUTO-EXCEL BACKEND

### Your Google Sheet

**URL**: https://docs.google.com/spreadsheets/d/1q7Nb9kYhkWzC_7UcyIPmY6rfw1q-2jQWKYDp9j0PWK4/edit

**Features**:
- ✅ **Quote Requests Sheet**: All customer quotes automatically added here
- ✅ **Analytics Sheet**: Real-time statistics and insights
- ✅ **Instructions Sheet**: How to use the system

**Columns**:
1. Timestamp - When quote was submitted
2. Name - Customer name
3. Company - Company name
4. Email - Customer email
5. Phone - Customer phone
6. Product Category - Type of steel requested
7. Quantity - Amount needed
8. Specific Products - Selected products
9. Detailed Specifications - Full requirements
10. Delivery Location - Where to deliver
11. Required By Date - Deadline
12. Additional Notes - Extra information
13. **Status** - Track progress (New/Contacted/Quoted/Closed)
14. **Follow-up Date** - Set reminders
15. **Quote Sent** - Mark Yes/No
16. **Notes** - Internal notes

---

### Step 1: Deploy Google Apps Script

1. **Open Your Google Sheet**:
   - Go to: https://docs.google.com/spreadsheets/d/1q7Nb9kYhkWzC_7UcyIPmY6rfw1q-2jQWKYDp9j0PWK4/edit

2. **Open Apps Script Editor**:
   - Click: `Extensions` → `Apps Script`

3. **Copy the Backend Code**:
   - Open: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/backend/google-apps-script.js
   - Copy ALL the code

4. **Paste in Apps Script**:
   - Delete any existing code in Apps Script editor
   - Paste the copied code
   - Click: `💾 Save` (or Ctrl+S)

5. **Deploy as Web App**:
   - Click: `Deploy` → `New deployment`
   - Click: ⚙️ gear icon → Select type: `Web app`
   - Settings:
     - **Description**: "Quote Form Backend"
     - **Execute as**: "Me (your-email@gmail.com)"
     - **Who has access**: "Anyone"
   - Click: `Deploy`

6. **Authorize the Script**:
   - Click: `Authorize access`
   - Choose your Google account
   - Click: `Advanced` → `Go to [Project Name] (unsafe)`
   - Click: `Allow`

7. **Copy Web App URL**:
   - After deployment, you'll see: "Web app URL"
   - Copy this URL (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)
   - **SAVE THIS URL** - You'll need it for the next step!

---

### Step 2: Update Quote Form

1. **Edit quote-request.html**:
   - Go to: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/quote-request.html
   - Click: ✏️ Edit button

2. **Find the Form Tag** (around line 625):
   ```html
   <form id="quoteForm" action="https://api.web3forms.com/submit" method="POST">
   ```

3. **Replace with Your Web App URL**:
   ```html
   <form id="quoteForm" action="YOUR_WEB_APP_URL_HERE" method="POST">
   ```
   
   Example:
   ```html
   <form id="quoteForm" action="https://script.google.com/macros/s/AKfycby.../exec" method="POST">
   ```

4. **Commit Changes**:
   - Scroll down
   - Commit message: "✅ Connected form to Google Sheets backend"
   - Click: `Commit changes`

---

### Step 3: Test the System

1. **Wait 2-3 minutes** for GitHub Pages to deploy

2. **Visit Your Quote Form**:
   - Go to: https://kapasiraj84-beep.github.io/bhavya-steel-industries/quote-request.html
   - (Or www.bhavyasteelindustries.com/quote-request.html after domain is configured)

3. **Submit a Test Quote**:
   - Fill out the form with test data
   - Click: "Submit Quote Request"

4. **Verify**:
   - ✅ Check Google Sheet - New row should appear
   - ✅ Check email - Notification should arrive
   - ✅ Thank you page should display

---

## 📧 PART 3: EMAIL NOTIFICATIONS

### How It Works

When a customer submits a quote:
1. Data is saved to Google Sheet
2. Email is sent to:
   - bhavyasteelindustries20@gmail.com
   - kapasiraj84@gmail.com
3. Email includes:
   - All customer details
   - Product requirements
   - Direct link to Google Sheet
   - Reply button (goes to customer)

### Email Features

- ✅ **Professional HTML Design**
- ✅ **All Quote Details**
- ✅ **Direct Reply** - Click reply, goes to customer
- ✅ **Quick Actions** - View in sheet, email customer
- ✅ **Mobile Friendly**

---

## 📊 PART 4: USING THE SYSTEM

### Daily Workflow

1. **New Quote Arrives**:
   - Email notification received
   - Check Google Sheet for details

2. **Update Status**:
   - Open Google Sheet
   - Change Status column: `New` → `Contacted`

3. **Send Quote**:
   - Reply to customer email
   - Mark "Quote Sent" as `Yes`
   - Add follow-up date

4. **Track Progress**:
   - Update status: `Contacted` → `Quoted` → `Closed`
   - Add notes in Notes column

### Download as Excel

**Method 1: Full Download**
1. Open Google Sheet
2. Click: `File` → `Download` → `Microsoft Excel (.xlsx)`
3. Save to your computer

**Method 2: Filtered Download**
1. Apply filters (Data → Create a filter)
2. Filter by date, status, product, etc.
3. Download filtered data

### Analytics Dashboard

Check the **Analytics** sheet for:
- Total quotes received
- Quotes this month/week
- Status breakdown
- Top product categories
- Conversion rates

---

## 🔧 TROUBLESHOOTING

### Domain Not Working

**Issue**: www.bhavyasteelindustries.com shows error

**Solutions**:
1. Wait 24-48 hours for DNS propagation
2. Check DNS records are correct
3. Verify CNAME file exists in repo
4. Check GitHub Pages settings

### Form Not Submitting to Sheet

**Issue**: Form submits but data doesn't appear in sheet

**Solutions**:
1. Verify Web App URL is correct in form
2. Check Apps Script deployment settings
3. Ensure "Who has access" is set to "Anyone"
4. Re-deploy the Apps Script
5. Check Apps Script execution logs

### Email Not Arriving

**Issue**: No email notification received

**Solutions**:
1. Check spam folder
2. Verify email addresses in Apps Script
3. Check Apps Script execution logs
4. Test email manually from Apps Script

### How to Check Apps Script Logs

1. Open Apps Script editor
2. Click: `Executions` (left sidebar)
3. View recent executions and errors
4. Click on execution to see detailed logs

---

## 💰 COST BREAKDOWN

| Service | Cost | Frequency |
|---------|------|-----------|
| Domain (bhavyasteelindustries.com) | ₹500-800 | Per year |
| GitHub Pages Hosting | FREE | Forever |
| Google Sheets Backend | FREE | Forever |
| Google Apps Script | FREE | Forever |
| SSL Certificate | FREE | Auto-renewed |
| Email Notifications | FREE | Forever |
| **TOTAL** | **₹500-800/year** | **Domain only!** |

---

## 🎯 FEATURES SUMMARY

### Website Features
- ✅ Professional design
- ✅ Mobile responsive
- ✅ Fast loading
- ✅ SEO optimized
- ✅ Secure HTTPS
- ✅ Custom domain

### Quote System Features
- ✅ Real-time form validation
- ✅ Spam protection (honeypot)
- ✅ Auto-save to Google Sheets
- ✅ Email notifications
- ✅ Thank you page
- ✅ Error handling

### Backend Features
- ✅ Automatic data entry
- ✅ Excel export
- ✅ Status tracking
- ✅ Analytics dashboard
- ✅ Search & filter
- ✅ Multi-user access

---

## 📞 SUPPORT

### Need Help?

**Email**: kapasiraj84@gmail.com

**Common Issues**:
- Domain setup: Check DNS records
- Form issues: Verify Web App URL
- Email problems: Check spam folder
- Sheet access: Verify sharing settings

### Resources

- **Google Sheet**: https://docs.google.com/spreadsheets/d/1q7Nb9kYhkWzC_7UcyIPmY6rfw1q-2jQWKYDp9j0PWK4/edit
- **GitHub Repo**: https://github.com/kapasiraj84-beep/bhavya-steel-industries
- **Apps Script Code**: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/backend/google-apps-script.js

---

## ✅ SETUP CHECKLIST

### Domain Setup
- [ ] Purchase domain: bhavyasteelindustries.com
- [ ] Configure A records (4 records)
- [ ] Configure CNAME record
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Verify domain works
- [ ] Enable HTTPS in GitHub Pages

### Backend Setup
- [ ] Open Google Sheet
- [ ] Open Apps Script editor
- [ ] Copy backend code from GitHub
- [ ] Paste in Apps Script
- [ ] Save the script
- [ ] Deploy as Web App
- [ ] Authorize access
- [ ] Copy Web App URL
- [ ] Update quote-request.html with URL
- [ ] Commit changes

### Testing
- [ ] Submit test quote
- [ ] Verify data in Google Sheet
- [ ] Check email notification
- [ ] Test thank you page
- [ ] Download as Excel
- [ ] Check analytics

### Go Live
- [ ] Domain is working
- [ ] Form is working
- [ ] Emails are arriving
- [ ] Sheet is updating
- [ ] System is LIVE! 🚀

---

## 🎊 CONGRATULATIONS!

You now have a **professional, automated quote management system** with:
- Custom domain
- Auto-Excel data capture
- Email notifications
- Analytics dashboard
- Zero monthly costs

**Your website**: www.bhavyasteelindustries.com
**Your backend**: Google Sheets + Apps Script
**Your cost**: ~₹600/year (domain only)

---

*Last Updated: February 2026*
*Version: 1.0*
