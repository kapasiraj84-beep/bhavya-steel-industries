# 🗺️ Add Clickable Google Maps Links to Location Addresses

## What This Does
Makes all location addresses on your website clickable - when someone clicks the address, it opens Google Maps with directions to your shop.

**Just like:** Clicking phone number opens WhatsApp  
**Now:** Clicking address opens Google Maps directions

---

## Changes to Make

### 1. Add CSS Style (Line ~133)

**Find this line:**
```css
        .whatsapp-link:hover { text-decoration: underline; }
```

**Add AFTER it:**
```css
        .location-link { color: var(--primary-accent); text-decoration: none; font-weight: 800; transition: all 0.3s ease; cursor: pointer; }
        .location-link:hover { text-decoration: underline; color: var(--accent); }
```

---

### 2. Make Contact Section Address Clickable (Line ~594)

**Find this:**
```html
                    <p>Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</p>
```

**Replace with:**
```html
                    <p><a href="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856" target="_blank" class="location-link" title="Get Directions on Google Maps">📍 Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India<br><strong>🗺️ Get Directions</strong></a></p>
```

---

### 3. Make GST/About Section Address Clickable (Line ~581)

**Find this:**
```html
                    <p><strong>Location:</strong> Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</p>
```

**Replace with:**
```html
                    <p><strong>Location:</strong> <a href="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856" target="_blank" class="location-link" title="Get Directions on Google Maps">Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India 🗺️</a></p>
```

---

### 4. Make Footer Address Clickable (Line ~648)

**Find this:**
```html
                    <p><i class="fas fa-map-marker-alt"></i> Naroda, Ahmedabad, Gujarat</p>
```

**Replace with:**
```html
                    <p><i class="fas fa-map-marker-alt"></i> <a href="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856" target="_blank" class="location-link" style="color: rgba(255,255,255,0.85);" title="Get Directions">Naroda, Ahmedabad, Gujarat</a></p>
```

---

## Google Maps URL Explained

```
https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856
```

- `api=1` - Uses Google Maps Directions API
- `destination=23.0910902,72.6620856` - Your exact shop coordinates
- Opens Google Maps with "Directions to Bhavya Steel Industries"
- Works on mobile (opens Google Maps app) and desktop (opens in browser)

---

## How It Works

**Before:** Plain text address  
**After:** Clickable blue link

**When clicked:**
- Mobile: Opens Google Maps app with directions
- Desktop: Opens Google Maps website with directions
- Shows route from user's current location to your shop

---

## Testing

After making changes:
1. Visit your website
2. Click on any address
3. Should open Google Maps with directions
4. Try on mobile and desktop

---

**Location:** Satguru Swami Teoonramji Maharaj Overbridge, Naroda, Ahmedabad  
**Coordinates:** 23.0910902, 72.6620856
