#!/usr/bin/env python3
"""
Direct approach: Fetch raw file, make 3 changes, update via API
"""
import os
import sys

try:
    import requests
except ImportError:
    print("Installing requests...")
    os.system(f"{sys.executable} -m pip install requests")
    import requests

# Configuration
REPO = "kapasiraj84-beep/bhavya-steel-industries"
FILE_PATH = "index.html"
MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856"
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN', '')

def main():
    print("=" * 70)
    print("🗺️  ADDING GOOGLE MAPS CLICKABLE LINKS")
    print("=" * 70)
    print()
    
    if not GITHUB_TOKEN:
        print("❌ Error: GITHUB_TOKEN not found")
        sys.exit(1)
    
    # Step 1: Get current file
    print("📥 Fetching current index.html...")
    url = f"https://api.github.com/repos/{REPO}/contents/{FILE_PATH}"
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3.raw'
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"❌ Failed to fetch file: {response.status_code}")
        print(response.text)
        sys.exit(1)
    
    content = response.text
    print(f"✅ Fetched {len(content)} bytes")
    print()
    
    # Step 2: Get SHA (needed for update)
    headers_json = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json'
    }
    response = requests.get(url, headers=headers_json)
    sha = response.json()['sha']
    print(f"✅ Got file SHA: {sha[:8]}...")
    print()
    
    # Step 3: Make the 3 changes
    print("🔧 Applying changes...")
    original_content = content
    
    # Change 1: Contact section
    old1 = '<p>Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</p>'
    new1 = f'<p><a href="{MAPS_URL}" target="_blank" style="color: inherit; text-decoration: none;">Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</a></p>'
    
    if old1 in content:
        content = content.replace(old1, new1)
        print("  ✅ Change 1: Contact section address → clickable")
    else:
        print("  ⚠️  Warning: Contact section pattern not found")
    
    # Change 2: GST section
    old2 = '<p><strong>Location:</strong> Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</p>'
    new2 = f'<p><strong>Location:</strong> <a href="{MAPS_URL}" target="_blank" style="color: inherit; text-decoration: none;">Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</a></p>'
    
    if old2 in content:
        content = content.replace(old2, new2)
        print("  ✅ Change 2: GST section address → clickable")
    else:
        print("  ⚠️  Warning: GST section pattern not found")
    
    # Change 3: Footer
    old3 = '<p><i class="fas fa-map-marker-alt"></i> Naroda, Ahmedabad, Gujarat</p>'
    new3 = f'<p><i class="fas fa-map-marker-alt"></i> <a href="{MAPS_URL}" target="_blank" style="color: inherit; text-decoration: none;">Naroda, Ahmedabad, Gujarat</a></p>'
    
    if old3 in content:
        content = content.replace(old3, new3)
        print("  ✅ Change 3: Footer location → clickable")
    else:
        print("  ⚠️  Warning: Footer pattern not found")
    
    print()
    
    if content == original_content:
        print("⚠️  No changes were made (patterns not found)")
        sys.exit(1)
    
    # Step 4: Update file
    print("📤 Uploading updated file...")
    import base64
    
    update_data = {
        'message': '🗺️ ADD: Clickable Google Maps links\n\nMinimal changes - wrapped addresses in <a> tags:\n• Contact section address → clickable\n• GST section address → clickable\n• Footer location → clickable\n\nOpens Google Maps with directions to:\nSatguru Swami Teoonramji Maharaj Overbridge, Naroda, Ahmedabad',
        'content': base64.b64encode(content.encode('utf-8')).decode('utf-8'),
        'sha': sha
    }
    
    response = requests.put(url, json=update_data, headers=headers_json)
    
    if response.status_code in [200, 201]:
        result = response.json()
        print("✅ File updated successfully!")
        print()
        print("=" * 70)
        print("✅ DONE! All addresses are now clickable Google Maps links")
        print("=" * 70)
        print()
        print(f"🔗 Commit: {result['commit']['html_url']}")
        print(f"🗺️  Google Maps URL: {MAPS_URL}")
        print()
        print("Changes applied:")
        print("  1. Contact section address → clickable")
        print("  2. GST section address → clickable")
        print("  3. Footer location → clickable")
        print()
    else:
        print(f"❌ Failed to update file: {response.status_code}")
        print(response.text)
        sys.exit(1)

if __name__ == "__main__":
    main()
