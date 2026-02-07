# 🚀 ENABLE GITHUB PAGES - SUPER SIMPLE!

## Method 1: Click and Done (30 seconds)

1. **Click this link:** https://github.com/kapasiraj84-beep/bhavya-steel-industries/settings/pages

2. **You'll see a page that says "Build and deployment"**

3. **Under "Source":**
   - Click the dropdown (currently says "None" or "Deploy from a branch")
   - Select: **"Deploy from a branch"**

4. **Under "Branch":**
   - First dropdown: Select **"gh-pages"**
   - Second dropdown: Select **"/ (root)"**

5. **Click the green "Save" button**

6. **Wait 1 minute, then visit:**
   ```
   https://kapasiraj84-beep.github.io/bhavya-steel-industries/
   ```

---

## Method 2: Even Lazier - Use Browser Console

1. Go to: https://github.com/kapasiraj84-beep/bhavya-steel-industries/settings/pages

2. Press `F12` to open Developer Console

3. Click "Console" tab

4. Paste this code and press Enter:

```javascript
// Auto-select gh-pages branch
const sourceSelect = document.querySelector('select[name="source"]');
if (sourceSelect) {
    sourceSelect.value = 'branch';
    sourceSelect.dispatchEvent(new Event('change', { bubbles: true }));
}

setTimeout(() => {
    const branchSelect = document.querySelector('select[name="branch"]');
    if (branchSelect) {
        branchSelect.value = 'gh-pages';
        branchSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    setTimeout(() => {
        const saveButton = document.querySelector('button[type="submit"]');
        if (saveButton) {
            console.log('✅ Ready! Now click the Save button manually.');
        }
    }, 500);
}, 500);
```

5. Then just click the "Save" button that appears

---

## ✅ How to Know It Worked

After saving, you'll see a green box that says:
```
✅ Your site is live at https://kapasiraj84-beep.github.io/bhavya-steel-industries/
```

---

## 🎯 Your Site URLs (After Enabling)

- **Homepage:** https://kapasiraj84-beep.github.io/bhavya-steel-industries/
- **Quote Form:** https://kapasiraj84-beep.github.io/bhavya-steel-industries/quote-request.html
- **Test Page:** https://kapasiraj84-beep.github.io/bhavya-steel-industries/test.html

---

**Everything is ready. The code is perfect. You just need to enable Pages in settings!** 🚀
