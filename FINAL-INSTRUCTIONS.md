# 🗺️ Add Google Maps Links - Simple Copy-Paste Method

## Quick Summary
I've prepared everything, but the automated script had issues with multiline HTML. Here's the simplest manual method:

---

## ✅ Method: GitHub Web Editor (5 minutes)

### Step 1: Open index.html for editing
1. Go to: https://github.com/kapasiraj84-beep/bhavya-steel-industries/blob/main/index.html
2. Click the **pencil icon** (Edit this file) in the top right

### Step 2: Find and Replace (4 changes)

#### Change 1: Add CSS (Line ~133)
**Find this line:**
```css
        .whatsapp-link:hover { text-decoration: underline; }
```

**Add these 2 lines RIGHT AFTER it:**
```css
        .location-link { color: var(--primary-accent); text-decoration: none; font-weight: 800; transition: all 0.3s ease; cursor: pointer; }
        .location-link:hover { text-decoration: underline; color: var(--accent); }
```

---

#### Change 2: Contact Section (Line ~594)
**Find:**
```html
                    <p>Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</p>
```

**Replace with:**
```html
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856" target="_blank" class="location-link" title="Get Directions on Google Maps">📍 Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India<br><i class="fas fa-directions"></i> <strong>Get Directions</strong></a></p>
```

---

#### Change 3: GST Section (Line ~581)
**Find:**
```html
                    <p><strong>Location:</strong> Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</p>
```

**Replace with:**
```html
                    <p><strong>Location:</strong> <a href="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856" target="_blank" class="location-link" title="Get Directions">Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India <i class="fas fa-map-marked-alt"></i></a></p>
```

---

#### Change 4: Footer (Line ~648)
**Find:**
```html
                    <p><i class="fas fa-map-marker-alt"></i> Naroda, Ahmedabad, Gujarat</p>
```

**Replace with:**
```html
                    <p><i class="fas fa-map-marker-alt"></i> <a href="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856" target="_blank" class="location-link" style="color: rgba(255,255,255,0.85);" title="Get Directions">Naroda, Ahmedabad, Gujarat</a></p>
```

---

### Step 3: Commit
1. Scroll to bottom
2. Commit message: `🗺️ ADD: Clickable Google Maps links to all location addresses`
3. Click **"Commit changes"**

---

## ✅ Done!

Your website will automatically deploy with the changes. All location addresses will now be clickable and open Google Maps with directions.

---

## 🎯 What You'll Get

**Before:** Plain text addresses  
**After:** Blue clickable links that open Google Maps

**Desktop:** Opens Google Maps in new tab with directions  
**Mobile:** Opens Google Maps app with navigation

---

## 📚 Reference Files Created

All these files are in your repository for reference:
- `README-LOCATION-LINKS.md` - Complete overview
- `CHANGES-PREVIEW.md` - Before/after comparison
- `UPDATE-SCRIPT.md` - Detailed guide
- `apply-changes.py` - Python script
- `APPLY-LOCATION-LINKS.sh` - Bash script
- This file - Simplest method

---

**Google Maps URL:** `https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856`  
**Your Location:** Satguru Swami Teoonramji Maharaj Overbridge, Naroda, Ahmedabad (4.9★)

Ready to apply! Just follow the 3 steps above. 🚀
