# 🚀 Backend Setup Guide - Bhavya Steel Industries

## ✨ 100% FREE - NO API KEYS NEEDED!

This setup uses **Google Apps Script** as a serverless backend. It's completely free and requires zero API keys or paid services.

---

## 📋 What You'll Get

✅ **Automatic Google Sheets Integration** - All quote requests saved automatically  
✅ **Email Notifications** - Get notified instantly when someone requests a quote  
✅ **Customer Confirmations** - Automatic confirmation emails to customers  
✅ **Real-time Updates** - See new quotes appear in your sheet immediately  
✅ **Professional Formatting** - Beautiful emails and organized spreadsheet  
✅ **Zero Cost** - Completely free, no subscriptions or API keys

---

## 🎯 Step-by-Step Setup (5 Minutes)

### Step 1: Open Your Google Sheet

1. Click this link: [Your Quote Requests Sheet](https://docs.google.com/spreadsheets/d/1vsxUQfc88BqiwCKiJ7BryEoBIP-dZFbfsMAGBCIOte0/edit)
2. The sheet is already created with proper headers and formatting

### Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. You'll see a code editor open in a new tab

### Step 3: Paste the Backend Code

1. **Delete** any existing code in the editor
2. Open the file: [google-apps-script.js](./google-apps-script.js)
3. **Copy ALL the code** from that file
4. **Paste** it into the Apps Script editor
5. Click the **Save** icon (💾) or press `Ctrl+S`

### Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure settings:
   - **Description**: "Quote Request API"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to [Project Name] (unsafe)**
9. Click **Allow**
10. **COPY THE WEB APP URL** - It looks like:
    ```
    https://script.google.com/macros/s/AKfycby.../exec
    ```

### Step 5: Update Your Website

1. Open the file: [quote-form-backend.js](./quote-form-backend.js)
2. Find line 2:
   ```javascript
   const API_URL = 'https://bhavya-steel-api.up.railway.app/api/quote';
   ```
3. Replace it with your Web App URL:
   ```javascript
   const API_URL = 'YOUR_WEB_APP_URL_HERE';
   ```
4. Save and commit the changes

### Step 6: Update Your HTML File

1. Open [quote-request.html](./quote-request.html)
2. Find the line that loads the old script (near the bottom, before `</body>`)
3. Replace it with:
   ```html
   <script src="quote-form-backend.js"></script>
   ```
4. Save and commit

---

## 🎉 That's It! You're Done!

Your website now has a **fully automated backend** that:

- ✅ Saves all quote requests to Google Sheets
- ✅ Sends you email notifications
- ✅ Sends confirmation emails to customers
- ✅ Validates all form data
- ✅ Works 24/7 without any maintenance

---

## 📧 Email Configuration (Optional)

By default, emails are sent from your Google account. To customize:

1. Open the Apps Script editor
2. Find these lines at the top:
   ```javascript
   const NOTIFICATION_EMAIL = 'kapasiraj84@gmail.com';
   const SEND_NOTIFICATIONS = true;
   ```
3. Change the email to your preferred address
4. Set `SEND_NOTIFICATIONS` to `false` if you don't want email alerts
5. Save and redeploy

---

## 🧪 Testing Your Setup

1. Visit your website: https://kapasiraj84-beep.github.io/bhavya-steel-industries/quote-request.html
2. Fill out the quote form
3. Submit it
4. Check your Google Sheet - you should see the new entry
5. Check your email - you should receive a notification

---

## 🔧 Troubleshooting

### "Script not authorized" error
- Make sure you clicked "Allow" during authorization
- Try deploying again

### Form not submitting
- Check browser console for errors (F12)
- Verify the API_URL is correct in quote-form-backend.js
- Make sure the Web App is deployed with "Anyone" access

### Not receiving emails
- Check spam folder
- Verify NOTIFICATION_EMAIL is correct
- Check Apps Script execution logs: **Executions** tab in Apps Script

### Sheet not updating
- Verify SPREADSHEET_ID matches your sheet
- Check Apps Script execution logs for errors
- Make sure sheet name is exactly "Quote Requests"

---

## 📊 Viewing Your Data

**Google Sheet**: [View Quote Requests](https://docs.google.com/spreadsheets/d/1vsxUQfc88BqiwCKiJ7BryEoBIP-dZFbfsMAGBCIOte0/edit)

The sheet includes:
- Timestamp (when request was received)
- Customer details (name, email, phone, company)
- Product information
- Quantity and unit
- Custom message
- Status (New/Contacted/Quoted/Closed)

---

## 🎨 Customization

### Change Email Templates

Edit the `sendNotificationEmail()` and `sendCustomerConfirmation()` functions in the Apps Script to customize email content and styling.

### Add More Fields

1. Add columns to your Google Sheet
2. Update the `rowData` array in Apps Script
3. Add fields to your HTML form
4. Update the form submission in quote-form-backend.js

### Change Sheet Name

If you want to use a different sheet name:
1. Rename the sheet in Google Sheets
2. Update `SHEET_NAME` in the Apps Script
3. Redeploy

---

## 💡 Pro Tips

1. **Backup Your Data**: Regularly download your sheet as Excel/CSV
2. **Monitor Logs**: Check Apps Script execution logs weekly
3. **Update Status**: Use the Status column to track quote progress
4. **Add Filters**: Use Google Sheets filters to sort by product, date, etc.
5. **Create Charts**: Visualize your quote data with Google Sheets charts

---

## 🆘 Need Help?

If you encounter any issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review Apps Script execution logs
3. Verify all URLs and IDs are correct
4. Test with a simple form submission

---

## 🎯 Next Steps

Once your backend is working:

1. ✅ Test thoroughly with multiple submissions
2. ✅ Customize email templates to match your branding
3. ✅ Set up Google Sheets notifications for instant alerts
4. ✅ Create a dashboard to track quote conversion rates
5. ✅ Add more products to your website

---

**🎉 Congratulations! Your website now has a professional, automated quote system with ZERO cost!**