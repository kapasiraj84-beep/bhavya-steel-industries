#!/bin/bash
# Bash script to fix Bright Bar grades in index.html
# Run with: bash fix-bright-bars.sh

REPO="kapasiraj84-beep/bhavya-steel-industries"
FILE_PATH="index.html"
RAW_URL="https://raw.githubusercontent.com/${REPO}/main/${FILE_PATH}"

echo "🔧 Fixing Bright Bar grades..."
echo ""

# Fetch the file
echo "Fetching ${FILE_PATH}..."
curl -s "${RAW_URL}" > index-temp.html

if [ ! -f index-temp.html ]; then
    echo "✗ Error: Failed to download file"
    exit 1
fi

echo "✓ Fetched ${FILE_PATH}"

# Count before
BEFORE_COUNT=$(grep -c '<li>Grade: EN8, C45</li>' index-temp.html)
echo ""
echo "Found ${BEFORE_COUNT} instances of 'Grade: EN8, C45'"
echo ""

# Create the fixed version
# We'll use sed with context-aware replacement
# This is tricky in bash, so we'll use a Python one-liner instead

python3 << 'EOF'
with open('index-temp.html', 'r') as f:
    data = f.read()

# Replace ONLY in Bright Bar sections
bright_bar_products = [
    'MS Bright Round Bars',
    'MS Bright Flat Bars',
    'MS Bright Square Bars',
    'MS Bright Hexagon Bars'
]

replacements = 0
for product in bright_bar_products:
    heading = f'<h3>{product}</h3>'
    idx = data.find(heading)
    if idx != -1:
        specs_start = data.find('<div class="product-specs">', idx)
        specs_end = data.find('</div>', specs_start) + 6
        if specs_start != -1 and specs_end != -1:
            section = data[specs_start:specs_end]
            if '<li>Grade: EN8, C45</li>' in section:
                fixed_section = section.replace('<li>Grade: EN8, C45</li>', '<li>Grade: Polished</li>')
                data = data[:specs_start] + fixed_section + data[specs_end:]
                replacements += 1
                print(f'  ✓ Fixed: {product}')

with open('index-fixed.html', 'w') as f:
    f.write(data)

print(f'\n✓ Made {replacements} replacements')
EOF

# Count after
AFTER_COUNT=$(grep -c '<li>Grade: EN8, C45</li>' index-fixed.html)
POLISHED_COUNT=$(grep -c '<li>Grade: Polished</li>' index-fixed.html)

echo "✓ Remaining 'Grade: EN8, C45': ${AFTER_COUNT}"
echo "✓ Total 'Grade: Polished': ${POLISHED_COUNT}"
echo ""
echo "✓ Saved fixed file as: index-fixed.html"
echo ""
echo "Next steps:"
echo "1. Review the changes: diff index-temp.html index-fixed.html"
echo "2. Replace index.html in your repository with index-fixed.html"
echo "3. Commit and push the changes"
echo ""

# Cleanup
rm index-temp.html
