# 🗺️ Add Google Maps Links - SIMPLEST METHOD

## ✅ What You Asked For
Make location addresses clickable → Opens Google Maps directly. **NO other changes.**

---

## 🎯 Quick Method (5 minutes)

### Step 1: Open File
Go to: https://github.com/kapasiraj84-beep/bhavya-steel-industries/edit/main/index.html

### Step 2: Make 3 Changes

Use **Ctrl+F** (or **Cmd+F** on Mac) to find and replace:

---

#### **Change 1: Contact Section (Line ~594)**

**FIND:**
```html
<p>Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</p>
```

**REPLACE WITH:**
```html
<p><a href="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856" target="_blank" style="color: inherit; text-decoration: none;">Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</a></p>
```

---

#### **Change 2: GST Section (Line ~581)**

**FIND:**
```html
<p><strong>Location:</strong> Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</p>
```

**REPLACE WITH:**
```html
<p><strong>Location:</strong> <a href="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856" target="_blank" style="color: inherit; text-decoration: none;">Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</a></p>
```

---

#### **Change 3: Footer (Line ~646)**

**FIND:**
```html
<p><i class="fas fa-map-marker-alt"></i> Naroda, Ahmedabad, Gujarat</p>
```

**REPLACE WITH:**
```html
<p><i class="fas fa-map-marker-alt"></i> <a href="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856" target="_blank" style="color: inherit; text-decoration: none;">Naroda, Ahmedabad, Gujarat</a></p>
```

---

### Step 3: Commit

Scroll to bottom:
- **Commit message:** `🗺️ ADD: Clickable Google Maps links`
- Click **"Commit changes"**

---

## ✅ Done!

Your website will auto-deploy. All location addresses will now open Google Maps when clicked.

**Google Maps URL:** https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856  
**Location:** Satguru Swami Teoonramji Maharaj Overbridge, Naroda, Ahmedabad

---

## 📝 What Changed

**Before:** Plain text addresses  
**After:** Clickable links (same appearance, just clickable)

**Desktop:** Opens Google Maps in new tab with directions  
**Mobile:** Opens Google Maps app with navigation

---

## 🔧 Alternative: Use Node.js Script

If you have Node.js installed locally:

```bash
# Clone repo
git clone https://github.com/kapasiraj84-beep/bhavya-steel-industries.git
cd bhavya-steel-industries

# Run script
node add-links.js

# Commit and push
git add index.html
git commit -m "🗺️ ADD: Clickable Google Maps links"
git push
```

The `add-links.js` script is already in your repo and ready to use.

---

**That's it!** Just 3 find-and-replace operations. No CSS changes, no styling changes, just wrapping addresses in `<a>` tags.
