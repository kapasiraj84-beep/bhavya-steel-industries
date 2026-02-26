#!/usr/bin/env python3
"""
Script to add Google Maps links to location addresses in index.html
Makes the address clickable to open Google Maps directions
"""

# Google Maps URL with exact coordinates
MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856"

# CSS style to add (similar to whatsapp-link)
LOCATION_LINK_CSS = """        .location-link { color: var(--primary-accent); text-decoration: none; font-weight: 800; transition: all 0.3s ease; cursor: pointer; }
        .location-link:hover { text-decoration: underline; color: var(--accent); }"""

# Original address text in Contact section
CONTACT_ADDRESS_OLD = """                    <p>Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</p>"""

# New clickable address
CONTACT_ADDRESS_NEW = f"""                    <p><a href="{MAPS_URL}" target="_blank" class="location-link" title="Get Directions on Google Maps">Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India<br><i class="fas fa-map-marked-alt"></i> Get Directions</a></p>"""

# Original address in About/GST section
GST_ADDRESS_OLD = """                    <p><strong>Location:</strong> Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</p>"""

# New clickable address in GST section
GST_ADDRESS_NEW = f"""                    <p><strong>Location:</strong> <a href="{MAPS_URL}" target="_blank" class="location-link" title="Get Directions on Google Maps">Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India <i class="fas fa-map-marked-alt"></i></a></p>"""

# Footer address
FOOTER_ADDRESS_OLD = """                    <p><i class="fas fa-map-marker-alt"></i> Naroda, Ahmedabad, Gujarat</p>"""

# New clickable footer address
FOOTER_ADDRESS_NEW = f"""                    <p><i class="fas fa-map-marker-alt"></i> <a href="{MAPS_URL}" target="_blank" class="location-link" title="Get Directions">Naroda, Ahmedabad, Gujarat</a></p>"""

# Where to insert CSS (after whatsapp-link style)
CSS_INSERT_AFTER = """        .whatsapp-link:hover { text-decoration: underline; }"""

print("=" * 60)
print("LOCATION LINKS UPDATE SCRIPT")
print("=" * 60)
print(f"\nGoogle Maps URL: {MAPS_URL}")
print("\nChanges to make:")
print("1. Add .location-link CSS style")
print("2. Make Contact section address clickable")
print("3. Make GST/About section address clickable")
print("4. Make Footer address clickable")
print("\nTo apply these changes, run:")
print("python3 add-location-links.py apply")
