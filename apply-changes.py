#!/usr/bin/env python3
"""
Automated script to add Google Maps clickable links to index.html
Reads the file, makes 4 targeted changes, and saves the result
"""

import re

# Google Maps URL
MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856"

def apply_changes(content):
    """Apply all 4 changes to the HTML content"""
    
    # Change 1: Add CSS after .whatsapp-link:hover
    css_pattern = r'(\.whatsapp-link:hover \{ text-decoration: underline; \})'
    css_replacement = r'\1\n        .location-link { color: var(--primary-accent); text-decoration: none; font-weight: 800; transition: all 0.3s ease; cursor: pointer; }\n        .location-link:hover { text-decoration: underline; color: var(--accent); }'
    content = re.sub(css_pattern, css_replacement, content)
    print("✅ Change 1: Added .location-link CSS style")
    
    # Change 2: Contact section address
    contact_pattern = r'<p>Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</p>'
    contact_replacement = f'<p><a href="{MAPS_URL}" target="_blank" class="location-link" title="Get Directions on Google Maps">📍 Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India<br><i class="fas fa-directions"></i> <strong>Get Directions</strong></a></p>'
    content = re.sub(contact_pattern, contact_replacement, content)
    print("✅ Change 2: Made Contact section address clickable")
    
    # Change 3: GST section address
    gst_pattern = r'<p><strong>Location:</strong> Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</p>'
    gst_replacement = f'<p><strong>Location:</strong> <a href="{MAPS_URL}" target="_blank" class="location-link" title="Get Directions">Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India <i class="fas fa-map-marked-alt"></i></a></p>'
    content = re.sub(gst_pattern, gst_replacement, content)
    print("✅ Change 3: Made GST section address clickable")
    
    # Change 4: Footer address
    footer_pattern = r'<p><i class="fas fa-map-marker-alt"></i> Naroda, Ahmedabad, Gujarat</p>'
    footer_replacement = f'<p><i class="fas fa-map-marker-alt"></i> <a href="{MAPS_URL}" target="_blank" class="location-link" style="color: rgba(255,255,255,0.85);" title="Get Directions">Naroda, Ahmedabad, Gujarat</a></p>'
    content = re.sub(footer_pattern, footer_replacement, content)
    print("✅ Change 4: Made Footer address clickable")
    
    return content

if __name__ == "__main__":
    print("=" * 60)
    print("🗺️  APPLYING GOOGLE MAPS LOCATION LINKS")
    print("=" * 60)
    print()
    
    # Read index.html
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
        print("📖 Read index.html successfully")
        print()
    except FileNotFoundError:
        print("❌ Error: index.html not found in current directory")
        print("   Please run this script from the repository root")
        exit(1)
    
    # Apply changes
    updated_content = apply_changes(content)
    print()
    
    # Save updated file
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(updated_content)
    print("💾 Saved updated index.html")
    print()
    
    print("=" * 60)
    print("✅ ALL CHANGES APPLIED SUCCESSFULLY!")
    print("=" * 60)
    print()
    print("📋 Next Steps:")
    print("  1. Review: git diff index.html")
    print("  2. Test: Open index.html in browser")
    print("  3. Commit: git add index.html")
    print("  4. Commit: git commit -m '🗺️ ADD: Clickable Google Maps links'")
    print("  5. Push: git push")
    print()
    print(f"🔗 Google Maps URL: {MAPS_URL}")
