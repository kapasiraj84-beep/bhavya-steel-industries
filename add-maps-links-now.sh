#!/bin/bash

# Google Maps URL
MAPS_URL="https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856"

echo "🗺️  Adding Google Maps clickable links..."
echo "=========================================="
echo ""

# Backup
cp index.html index.html.backup
echo "✅ Created backup: index.html.backup"
echo ""

# Change 1: Contact section (line 594)
echo "📍 Change 1: Contact section address..."
perl -i -pe 's|<p>Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</p>|<p><a href="'"$MAPS_URL"'" target="_blank" style="color: inherit; text-decoration: none;">Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</a></p>|g' index.html
echo "   ✅ Done"

# Change 2: GST section (line 581)
echo "📍 Change 2: GST section address..."
perl -i -pe 's|<p><strong>Location:</strong> Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</p>|<p><strong>Location:</strong> <a href="'"$MAPS_URL"'" target="_blank" style="color: inherit; text-decoration: none;">Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</a></p>|g' index.html
echo "   ✅ Done"

# Change 3: Footer (line 646)
echo "📍 Change 3: Footer location..."
perl -i -pe 's|<p><i class="fas fa-map-marker-alt"></i> Naroda, Ahmedabad, Gujarat</p>|<p><i class="fas fa-map-marker-alt"></i> <a href="'"$MAPS_URL"'" target="_blank" style="color: inherit; text-decoration: none;">Naroda, Ahmedabad, Gujarat</a></p>|g' index.html
echo "   ✅ Done"

echo ""
echo "=========================================="
echo "✅ ALL CHANGES APPLIED!"
echo "=========================================="
echo ""
echo "📋 Summary:"
echo "  • Contact section address → clickable"
echo "  • GST section address → clickable"
echo "  • Footer location → clickable"
echo ""
echo "🔗 Google Maps URL: $MAPS_URL"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff index.html"
echo "  2. Test locally: open index.html in browser"
echo "  3. Commit: git add index.html"
echo "  4. Commit: git commit -m '🗺️ ADD: Clickable Google Maps links'"
echo "  5. Push: git push"
echo ""
echo "To restore backup: mv index.html.backup index.html"
