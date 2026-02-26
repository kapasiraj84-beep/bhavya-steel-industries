const fs = require('fs');

const MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856';

console.log('🗺️  Adding Google Maps clickable links...');
console.log('==========================================\n');

// Read file
let content = fs.readFileSync('index.html', 'utf8');
console.log('✅ Read index.html\n');

// Change 1: Contact section
const old1 = '<p>Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</p>';
const new1 = `<p><a href="${MAPS_URL}" target="_blank" style="color: inherit; text-decoration: none;">Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</a></p>`;

if (content.includes(old1)) {
  content = content.replace(old1, new1);
  console.log('✅ Change 1: Contact section address → clickable');
} else {
  console.log('⚠️  Warning: Contact section pattern not found');
}

// Change 2: GST section
const old2 = '<p><strong>Location:</strong> Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</p>';
const new2 = `<p><strong>Location:</strong> <a href="${MAPS_URL}" target="_blank" style="color: inherit; text-decoration: none;">Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</a></p>`;

if (content.includes(old2)) {
  content = content.replace(old2, new2);
  console.log('✅ Change 2: GST section address → clickable');
} else {
  console.log('⚠️  Warning: GST section pattern not found');
}

// Change 3: Footer
const old3 = '<p><i class="fas fa-map-marker-alt"></i> Naroda, Ahmedabad, Gujarat</p>';
const new3 = `<p><i class="fas fa-map-marker-alt"></i> <a href="${MAPS_URL}" target="_blank" style="color: inherit; text-decoration: none;">Naroda, Ahmedabad, Gujarat</a></p>`;

if (content.includes(old3)) {
  content = content.replace(old3, new3);
  console.log('✅ Change 3: Footer location → clickable');
} else {
  console.log('⚠️  Warning: Footer pattern not found');
}

// Write file
fs.writeFileSync('index.html', content, 'utf8');
console.log('\n✅ Saved updated index.html');

console.log('\n==========================================');
console.log('✅ DONE! All addresses are now clickable');
console.log('==========================================\n');
console.log(`🔗 Google Maps URL: ${MAPS_URL}\n`);
