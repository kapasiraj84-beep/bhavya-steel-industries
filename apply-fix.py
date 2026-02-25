#!/usr/bin/env python3
"""
Direct fix for Bright Bar grades
This script will download, fix, and show you the corrected content
"""

import urllib.request
import sys

REPO = 'kapasiraj84-beep/bhavya-steel-industries'
RAW_URL = f'https://raw.githubusercontent.com/{REPO}/main/index.html'

print('🔧 Downloading and fixing Bright Bar grades...\n')

try:
    # Fetch the file
    with urllib.request.urlopen(RAW_URL) as response:
        content = response.read().decode('utf-8')
    
    print(f'✓ Downloaded index.html ({len(content)} characters)\n')
    
    # Count before
    before_count = content.count('<li>Grade: EN8, C45</li>')
    print(f'Found {before_count} instances of "Grade: EN8, C45"\n')
    
    # Fix each Bright Bar product
    fixed_content = content
    replacements = 0
    
    bright_bar_products = [
        'MS Bright Round Bars',
        'MS Bright Flat Bars',
        'MS Bright Square Bars',
        'MS Bright Hexagon Bars'
    ]
    
    for product_name in bright_bar_products:
        heading = f'<h3>{product_name}</h3>'
        idx = fixed_content.find(heading)
        
        if idx != -1:
            # Find specs section
            specs_start = fixed_content.find('<div class="product-specs">', idx)
            if specs_start != -1:
                specs_end = fixed_content.find('</div>', specs_start + 100)
                if specs_end != -1:
                    specs_end += 6
                    section = fixed_content[specs_start:specs_end]
                    
                    if '<li>Grade: EN8, C45</li>' in section:
                        fixed_section = section.replace(
                            '<li>Grade: EN8, C45</li>',
                            '<li>Grade: Polished</li>'
                        )
                        fixed_content = (fixed_content[:specs_start] + 
                                       fixed_section + 
                                       fixed_content[specs_end:])
                        replacements += 1
                        print(f'  ✓ Fixed: {product_name}')
    
    # Count after
    after_count = fixed_content.count('<li>Grade: EN8, C45</li>')
    polished_count = fixed_content.count('<li>Grade: Polished</li>')
    
    print(f'\n✅ SUCCESS!')
    print(f'   Made {replacements} replacements')
    print(f'   Remaining "Grade: EN8, C45": {after_count}')
    print(f'   Total "Grade: Polished": {polished_count}')
    
    # Save the file
    with open('index-FIXED.html', 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f'\n📁 Saved as: index-FIXED.html')
    print('\n📋 NEXT STEPS:')
    print('   1. Open index-FIXED.html and verify the changes')
    print('   2. Go to: https://github.com/kapasiraj84-beep/bhavya-steel-industries')
    print('   3. Click on index.html → Edit (pencil icon)')
    print('   4. Replace ALL content with index-FIXED.html content')
    print('   5. Commit: "Fix Bright Bar grades to Polished"')
    
except Exception as e:
    print(f'❌ ERROR: {e}')
    sys.exit(1)
