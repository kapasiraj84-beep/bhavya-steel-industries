# Manual Fix Instructions

Since automated methods are hitting file size limits, here's the EXACT manual fix:

## What to Change

Open `index.html` and find these 4 sections. In EACH section, change ONE line:

### 1. MS Bright Round Bars (around line 358)
**FIND:**
```html
<li>Grade: EN8, C45</li>
```
**REPLACE WITH:**
```html
<li>Grade: Polished</li>
```

### 2. MS Bright Flat Bars (around line 378)
**FIND:**
```html
<li>Grade: EN8, C45</li>
```
**REPLACE WITH:**
```html
<li>Grade: Polished</li>
```

### 3. MS Bright Square Bars (around line 398)
**FIND:**
```html
<li>Grade: EN8, C45</li>
```
**REPLACE WITH:**
```html
<li>Grade: Polished</li>
```

### 4. MS Bright Hexagon Bars (around line 418)
**FIND:**
```html
<li>Grade: EN8, C45</li>
```
**REPLACE WITH:**
```html
<li>Grade: Polished</li>
```

## How to Find Them Quickly

1. Open index.html in GitHub editor
2. Press Ctrl+F (or Cmd+F on Mac)
3. Search for: `MS Bright Round Bars`
4. Scroll down to the `<li>Grade: EN8, C45</li>` line
5. Change it to `<li>Grade: Polished</li>`
6. Repeat for the other 3 Bright Bar products

## Important Notes

- ✅ ONLY change these 4 products (the ones with "Bright Bar" badge)
- ❌ DO NOT change EN8, EN19, EN24, EN31, or C45 Plates
- ✅ Each product has only ONE line to change

## Verification

After making changes, search for "Grade: EN8, C45" - you should find it ONLY in:
- EN8 Round Bars
- MS Round Bars  
- Other non-Bright Bar products

You should NOT find it in any of the 4 Bright Bar products.

---

**Total changes: 4 lines**
**Time needed: 2-3 minutes**
