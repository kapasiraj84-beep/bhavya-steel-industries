# 📊 Website Analytics Setup Guide - Bhavya Steel Industries

## What You'll Get
- **Track who visits your website** (device, browser, location)
- **See what pages they view** (which products they're interested in)
- **Know how long they stay** (total time spent on site)
- **Count button clicks** (Enquiry, WhatsApp, Call buttons)
- **Auto-updating dashboard** in Google Sheets with live counts

---

## 🎯 Quick Overview

Your analytics system has **3 parts**:

1. **Google Sheet** - Stores all visitor data (already created ✅)
2. **Google Apps Script** - Receives data from website (code ready ✅)
3. **Website Tracker** - Tracks visitors (code ready ✅)

**You just need to connect them!**

---

## 📋 Step-by-Step Setup (5 minutes)

### Step 1: Open Your Analytics Spreadsheet

1. Click this link: https://docs.google.com/spreadsheets/d/1RP_PjRzMGpxxo-QcEL80kfx5bse2hJsvo1GVWxVkJ9k/edit
2. You'll see 3 sheets:
   - **Enquiries** - Your existing enquiry form data
   - **Website Visitors** - NEW! Tracks every visitor
   - **Analytics Dashboard** - NEW! Live summary with counts

---

### Step 2: Deploy Google Apps Script

1. In the spreadsheet, click **Extensions** → **Apps Script**
2. You'll see the Apps Script editor open
3. **Delete ALL existing code** in the editor
4. Open this file: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/google-apps-script.js
5. Click **Raw** button (top right)
6. **Copy ALL the code** (Ctrl+A, Ctrl+C)
7. **Paste it** into Apps Script editor (Ctrl+V)
8. Click **💾 Save** (or Ctrl+S)

---

### Step 3: Deploy as Web App

1. In Apps Script editor, click **Deploy** → **New deployment**
2. Click the **⚙️ gear icon** next to "Select type"
3. Choose **Web app**
4. Fill in:
   - **Description:** `Bhavya Steel Analytics`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone`
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to Bhavya Steel Analytics (unsafe)**
9. Click **Allow**
10. **COPY THE WEB APP URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

---

### Step 4: Connect Website to Analytics

1. Open this file: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/analytics-tracker.js
2. Click **✏️ Edit** (pencil icon)
3. Find line 10: `const SHEET_URL = 'YOUR_DEPLOYMENT_URL_HERE';`
4. Replace `YOUR_DEPLOYMENT_URL_HERE` with your Web App URL from Step 3
5. Should look like:
   ```javascript
   const SHEET_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
6. Scroll down and click **Commit changes**
7. Add message: `Connect analytics to Google Sheets`
8. Click **Commit changes**

---

### Step 5: Add Tracker to Website

1. Open: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/index.html
2. Click **✏️ Edit**
3. Scroll to the **very bottom** (before `</body>`)
4. Add this line BEFORE `</body>`:
   ```html
   <script src="analytics-tracker.js"></script>
   ```
5. Should look like:
   ```html
       <script src="analytics-tracker.js"></script>
   </body>
   </html>
   ```
6. Click **Commit changes**
7. Message: `Enable visitor tracking`
8. Click **Commit changes**

---

## ✅ Test If It's Working

1. Wait 2-3 minutes for GitHub Pages to update
2. Visit your website: https://kapasiraj84-beep.github.io/bhavya-steel-industries/
3. Open browser console (Press F12 → Console tab)
4. You should see: `✅ Visitor tracked`
5. Go back to your Google Sheet
6. Check **Website Visitors** sheet - you should see a new row!
7. Check **Analytics Dashboard** - numbers should update automatically!

---

## 📊 Understanding Your Dashboard

### Analytics Dashboard Shows:

| Metric | What It Means |
|--------|---------------|
| **Total Visitors** | Every time someone visits (includes repeat visits) |
| **Unique Visitors** | Number of different people (based on device) |
| **Total Page Views** | How many pages were viewed |
| **Total Time Spent** | Combined time all visitors spent (in minutes) |
| **Average Time per Visit** | How long each visitor stays (in seconds) |
| **Mobile/Desktop/Tablet** | What devices people use |
| **Enquiry Button Clicks** | How many clicked "Request Enquiry" |
| **WhatsApp Clicks** | How many clicked WhatsApp button |
| **Call Button Clicks** | How many clicked call button |

### Website Visitors Sheet Shows:

- **Timestamp** - Exact date/time of visit
- **Page URL** - Which page they visited
- **Device Type** - Mobile/Desktop/Tablet
- **Browser** - Chrome, Safari, Firefox, etc.
- **Time on Page** - How many seconds they stayed
- **Button Clicked** - Which button they clicked (if any)
- **Visitor ID** - Unique ID per device (to count unique visitors)

---

## 🎯 What Gets Tracked?

✅ **Every page visit** - Home, Products, Contact, etc.  
✅ **Device type** - Mobile, Desktop, Tablet  
✅ **Browser** - Chrome, Safari, Firefox, etc.  
✅ **Time spent** - How long they stay on each page  
✅ **Button clicks** - Enquiry, WhatsApp, Call buttons  
✅ **Referrer** - Where they came from (Google, Direct, etc.)  
✅ **Screen size** - Their device resolution  

❌ **NOT tracked** - Personal info, IP addresses, exact location

---

## 🔧 Troubleshooting

### "No data appearing in sheet"

1. Check browser console (F12) - any errors?
2. Verify Web App URL is correct in `analytics-tracker.js`
3. Make sure you deployed as "Anyone" can access
4. Wait 2-3 minutes after making changes

### "Permission denied" error

1. Re-deploy Apps Script
2. Make sure "Execute as: Me" is selected
3. Re-authorize the script

### "Script not loading"

1. Clear browser cache (Ctrl+Shift+Delete)
2. Check if `analytics-tracker.js` is in repository
3. Verify script tag is before `</body>` in index.html

---

## 📧 Optional: Daily Email Reports

Want daily analytics emails?

1. Open Apps Script editor
2. Find function `sendDailyReport()`
3. Uncomment this line (remove `//`):
   ```javascript
   MailApp.sendEmail('kapasiraj84@gmail.com', '📊 Daily Website Analytics', emailBody);
   ```
4. Run `setupDailyTrigger()` function once (click ▶️ Run)
5. You'll get daily emails at 11 PM with visitor stats!

---

## 🎉 You're Done!

Your website now tracks:
- ✅ Who visits
- ✅ What they view
- ✅ How long they stay
- ✅ What buttons they click

All data goes to: https://docs.google.com/spreadsheets/d/1RP_PjRzMGpxxo-QcEL80kfx5bse2hJsvo1GVWxVkJ9k/edit

**Check the "Analytics Dashboard" sheet for live counts!**

---

## 📞 Need Help?

If something doesn't work, check:
1. Browser console for errors (F12)
2. Apps Script logs (View → Logs)
3. Make sure all steps were followed exactly

---

**Made with ❤️ for Bhavya Steel Industries**
