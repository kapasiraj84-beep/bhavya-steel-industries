#!/bin/bash
# Ultra-simple one-command fix
# Run: bash quick-fix.sh

echo "⚡ Quick Fix for Bright Bar Grades"
echo "=================================="
echo ""

# Download the file
echo "📥 Downloading index.html..."
curl -s https://raw.githubusercontent.com/kapasiraj84-beep/bhavya-steel-industries/main/index.html -o index.html

if [ ! -f index.html ]; then
    echo "❌ Failed to download"
    exit 1
fi

echo "✅ Downloaded"
echo ""

# Show what we're fixing
echo "🔍 Finding Bright Bar products..."
grep -n "MS Bright.*Bars" index.html | head -4
echo ""

# Make the fixes using sed with context
echo "🔧 Applying fixes..."

# We need to be surgical - only replace in Bright Bar sections
# Strategy: Use sed with line number ranges

# Find line numbers for each Bright Bar product
ROUND_LINE=$(grep -n "MS Bright Round Bars" index.html | cut -d: -f1)
FLAT_LINE=$(grep -n "MS Bright Flat Bars" index.html | cut -d: -f1)
SQUARE_LINE=$(grep -n "MS Bright Square Bars" index.html | cut -d: -f1)
HEXAGON_LINE=$(grep -n "MS Bright Hexagon Bars" index.html | cut -d: -f1)

echo "  Found at lines: $ROUND_LINE, $FLAT_LINE, $SQUARE_LINE, $HEXAGON_LINE"

# Create a temp file with the fix
cp index.html index-temp.html

# Use awk for precise replacement
awk -v r=$ROUND_LINE -v f=$FLAT_LINE -v s=$SQUARE_LINE -v h=$HEXAGON_LINE '
{
    # Check if we are within 20 lines after any Bright Bar heading
    if ((NR > r && NR < r+20) || (NR > f && NR < f+20) || (NR > s && NR < s+20) || (NR > h && NR < h+20)) {
        # Replace only in these sections
        gsub(/<li>Grade: EN8, C45<\/li>/, "<li>Grade: Polished</li>")
    }
    print
}' index-temp.html > index-fixed.html

# Verify the changes
BEFORE=$(grep -c "Grade: EN8, C45" index.html)
AFTER=$(grep -c "Grade: EN8, C45" index-fixed.html)
POLISHED=$(grep -c "Grade: Polished" index-fixed.html)

echo ""
echo "✅ DONE!"
echo "   Before: $BEFORE instances of 'Grade: EN8, C45'"
echo "   After:  $AFTER instances of 'Grade: EN8, C45'"
echo "   Polished: $POLISHED instances of 'Grade: Polished'"
echo ""
echo "📁 Fixed file saved as: index-fixed.html"
echo ""
echo "📋 NEXT STEP:"
echo "   Replace index.html in GitHub with index-fixed.html"
echo ""
echo "   Quick way:"
echo "   1. Go to: https://github.com/kapasiraj84-beep/bhavya-steel-industries/edit/main/index.html"
echo "   2. Delete all content (Ctrl+A, Delete)"
echo "   3. Paste content from index-fixed.html"
echo "   4. Commit with message: 'Fix Bright Bar grades to Polished'"

# Cleanup
rm index-temp.html
