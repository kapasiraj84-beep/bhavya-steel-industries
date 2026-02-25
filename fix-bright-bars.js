// Node.js script to fix Bright Bar grades in index.html
// Run with: node fix-bright-bars.js

const https = require('https');
const fs = require('fs');

const REPO = 'kapasiraj84-beep/bhavya-steel-industries';
const FILE_PATH = 'index.html';
const RAW_URL = `https://raw.githubusercontent.com/${REPO}/main/${FILE_PATH}`;

console.log('🔧 Fixing Bright Bar grades...\n');

// Fetch the file
https.get(RAW_URL, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log(`✓ Fetched ${FILE_PATH} (${data.length} characters)`);
        
        // Count occurrences before
        const beforeCount = (data.match(/<li>Grade: EN8, C45<\/li>/g) || []).length;
        console.log(`\nFound ${beforeCount} instances of "Grade: EN8, C45"`);
        
        // Strategy: Replace ONLY in Bright Bar sections
        // We'll use a context-aware replacement
        
        let fixedData = data;
        let replacements = 0;
        
        // Find each Bright Bar product and replace within its context
        const brightBarProducts = [
            'MS Bright Round Bars',
            'MS Bright Flat Bars',
            'MS Bright Square Bars',
            'MS Bright Hexagon Bars'
        ];
        
        brightBarProducts.forEach(productName => {
            // Find the product heading
            const headingPattern = `<h3>${productName}</h3>`;
            let index = fixedData.indexOf(headingPattern);
            
            if (index !== -1) {
                // Find the specifications section after this heading
                const specsStart = fixedData.indexOf('<div class="product-specs">', index);
                const specsEnd = fixedData.indexOf('</div>', specsStart) + 6;
                
                if (specsStart !== -1 && specsEnd !== -1) {
                    const specsSection = fixedData.substring(specsStart, specsEnd);
                    
                    // Replace within this section only
                    if (specsSection.includes('<li>Grade: EN8, C45</li>')) {
                        const fixedSpecs = specsSection.replace(
                            '<li>Grade: EN8, C45</li>',
                            '<li>Grade: Polished</li>'
                        );
                        
                        fixedData = fixedData.substring(0, specsStart) + 
                                   fixedSpecs + 
                                   fixedData.substring(specsEnd);
                        
                        replacements++;
                        console.log(`  ✓ Fixed: ${productName}`);
                    }
                }
            }
        });
        
        // Count occurrences after
        const afterCount = (fixedData.match(/<li>Grade: EN8, C45<\/li>/g) || []).length;
        
        console.log(`\n✓ Made ${replacements} replacements`);
        console.log(`✓ Remaining "Grade: EN8, C45": ${afterCount}`);
        console.log(`✓ New "Grade: Polished" in Bright Bars: ${replacements}`);
        
        // Save the fixed file
        fs.writeFileSync('index-fixed.html', fixedData);
        console.log(`\n✓ Saved fixed file as: index-fixed.html`);
        console.log('\nNext steps:');
        console.log('1. Review the changes in index-fixed.html');
        console.log('2. Replace index.html in your repository with this file');
        console.log('3. Commit and push the changes');
    });
}).on('error', (err) => {
    console.error('✗ Error:', err.message);
});
