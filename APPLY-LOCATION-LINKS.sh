#!/bin/bash
# Script to add clickable Google Maps links to index.html
# Run this script to automatically update all location addresses

MAPS_URL="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856"

echo "🗺️ Adding Google Maps Clickable Links to index.html"
echo "=================================================="
echo ""

# Backup original file
cp index.html index.html.backup
echo "✅ Created backup: index.html.backup"

# 1. Add CSS after .whatsapp-link:hover
sed -i '/\.whatsapp-link:hover { text-decoration: underline; }/a\        .location-link { color: var(--primary-accent); text-decoration: none; font-weight: 800; transition: all 0.3s ease; cursor: pointer; }\n        .location-link:hover { text-decoration: underline; color: var(--accent); }' index.html
echo "✅ Added .location-link CSS style"

# 2. Make Contact section address clickable
sed -i 's|<p>Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</p>|<p><a href="'"$MAPS_URL"'" target="_blank" class="location-link" title="Get Directions on Google Maps">📍 Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India<br><i class="fas fa-directions"></i> <strong>Get Directions</strong></a></p>|g' index.html
echo "✅ Made Contact section address clickable"

# 3. Make GST section address clickable
sed -i 's|<p><strong>Location:</strong> Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</p>|<p><strong>Location:</strong> <a href="'"$MAPS_URL"'" target="_blank" class="location-link" title="Get Directions">Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India <i class="fas fa-map-marked-alt"></i></a></p>|g' index.html
echo "✅ Made GST section address clickable"

# 4. Make Footer address clickable
sed -i 's|<p><i class="fas fa-map-marker-alt"></i> Naroda, Ahmedabad, Gujarat</p>|<p><i class="fas fa-map-marker-alt"></i> <a href="'"$MAPS_URL"'" target="_blank" class="location-link" style="color: rgba(255,255,255,0.85);" title="Get Directions">Naroda, Ahmedabad, Gujarat</a></p>|g' index.html
echo "✅ Made Footer address clickable"

echo ""
echo "=================================================="
echo "✅ ALL CHANGES APPLIED SUCCESSFULLY!"
echo "=================================================="
echo ""
echo "📋 Summary:"
echo "  • Added .location-link CSS style"
echo "  • Contact section address → Clickable"
echo "  • GST section address → Clickable"
echo "  • Footer address → Clickable"
echo ""
echo "🔗 Google Maps URL: $MAPS_URL"
echo ""
echo "📝 Next Steps:"
echo "  1. Review changes: git diff index.html"
echo "  2. Test locally: open index.html in browser"
echo "  3. Commit: git add index.html && git commit -m '🗺️ ADD: Clickable Google Maps links'"
echo "  4. Push: git push"
echo ""
echo "💡 To restore backup: mv index.html.backup index.html"
