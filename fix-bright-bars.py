#!/usr/bin/env python3
"""
Python script to fix Bright Bar grades in index.html
Run with: python3 fix-bright-bars.py
"""

import urllib.request
import re

REPO = 'kapasiraj84-beep/bhavya-steel-industries'
FILE_PATH = 'index.html'
RAW_URL = f'https://raw.githubusercontent.com/{REPO}/main/{FILE_PATH}'

print('🔧 Fixing Bright Bar grades...\n')

# Fetch the file
print(f'Fetching {FILE_PATH}...')
with urllib.request.urlopen(RAW_URL) as response:
    data = response.read().decode('utf-8')

print(f'✓ Fetched {FILE_PATH} ({len(data)} characters)')

# Count occurrences before
before_count = data.count('<li>Grade: EN8, C45</li>')
print(f'\nFound {before_count} instances of "Grade: EN8, C45"')

# Strategy: Replace ONLY in Bright Bar sections
fixed_data = data
replacements = 0

# Find each Bright Bar product and replace within its context
bright_bar_products = [
    'MS Bright Round Bars',
    'MS Bright Flat Bars',
    'MS Bright Square Bars',
    'MS Bright Hexagon Bars'
]

for product_name in bright_bar_products:
    # Find the product heading
    heading_pattern = f'<h3>{product_name}</h3>'
    index = fixed_data.find(heading_pattern)
    
    if index != -1:
        # Find the specifications section after this heading
        specs_start = fixed_data.find('<div class="product-specs">', index)
        specs_end = fixed_data.find('</div>', specs_start) + 6
        
        if specs_start != -1 and specs_end != -1:
            specs_section = fixed_data[specs_start:specs_end]
            
            # Replace within this section only
            if '<li>Grade: EN8, C45</li>' in specs_section:
                fixed_specs = specs_section.replace(
                    '<li>Grade: EN8, C45</li>',
                    '<li>Grade: Polished</li>'
                )
                
                fixed_data = (fixed_data[:specs_start] + 
                            fixed_specs + 
                            fixed_data[specs_end:])
                
                replacements += 1
                print(f'  ✓ Fixed: {product_name}')

# Count occurrences after
after_count = fixed_data.count('<li>Grade: EN8, C45</li>')

print(f'\n✓ Made {replacements} replacements')
print(f'✓ Remaining "Grade: EN8, C45": {after_count}')
print(f'✓ New "Grade: Polished" in Bright Bars: {replacements}')

# Save the fixed file
with open('index-fixed.html', 'w', encoding='utf-8') as f:
    f.write(fixed_data)

print(f'\n✓ Saved fixed file as: index-fixed.html')
print('\nNext steps:')
print('1. Review the changes in index-fixed.html')
print('2. Replace index.html in your repository with this file')
print('3. Commit and push the changes')
