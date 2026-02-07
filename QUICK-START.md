# ⚡ QUICK START GUIDE

## 🎯 DO THIS FIRST (15 MINUTES)

### Step 1: Deploy Backend
1. Open: https://docs.google.com/spreadsheets/d/1q7Nb9kYhkWzC_7UcyIPmY6rfw1q-2jQWKYDp9j0PWK4/edit
2. Click: `Extensions` → `Apps Script`
3. Copy code from: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/backend/google-apps-script.js
4. Paste in Apps Script, Save
5. Click: `Deploy` → `New deployment` → Web app
6. Settings: Execute as "Me", Access "Anyone"
7. Click: `Deploy` → `Authorize` → `Allow`
8. **COPY THE WEB APP URL!**

### Step 2: Update Form
1. Edit: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/quote-request.html
2. Find line 625: `<form id="quoteForm" action="`
3. Replace URL with your Web App URL
4. Commit changes

### Step 3: Test
1. Wait 2 minutes
2. Visit: https://kapasiraj84-beep.github.io/bhavya-steel-industries/quote-request.html
3. Submit test quote
4. Check Google Sheet for new row
5. Check email for notification

---

## 🌐 DOMAIN SETUP (LATER)

### Buy Domain
- Go to: GoDaddy / Namecheap / Google Domains
- Buy: `bhavyasteelindustries.com` (~₹600/year)

### Configure DNS
Add these records in your domain provider:

**A Records (4):**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record:**
```
Name: www
Value: kapasiraj84-beep.github.io
```

Wait 24-48 hours → Your site will be live at www.bhavyasteelindustries.com

---

## 📊 YOUR RESOURCES

- **Google Sheet**: https://docs.google.com/spreadsheets/d/1q7Nb9kYhkWzC_7UcyIPmY6rfw1q-2jQWKYDp9j0PWK4/edit
- **Backend Code**: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/backend/google-apps-script.js
- **Full Guide**: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/SETUP-GUIDE.md
- **Current Site**: https://kapasiraj84-beep.github.io/bhavya-steel-industries/

---

## ✅ CHECKLIST

- [ ] Deploy Google Apps Script
- [ ] Update form with Web App URL
- [ ] Test quote submission
- [ ] Buy domain
- [ ] Configure DNS
- [ ] Wait for propagation
- [ ] System LIVE! 🚀

---

**Need help?** Email: kapasiraj84@gmail.com
