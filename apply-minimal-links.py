#!/usr/bin/env python3
"""
MINIMAL CHANGE SCRIPT
Only wraps addresses in <a> tags to make them clickable.
NO CSS changes, NO styling changes, NO other modifications.
"""

import requests
import base64
import os

# Configuration
REPO = "kapasiraj84-beep/bhavya-steel-industries"
FILE_PATH = "index.html"
MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=23.0910902,72.6620856"
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN', '')

def get_file_content():
    """Download current index.html from GitHub"""
    url = f"https://api.github.com/repos/{REPO}/contents/{FILE_PATH}"
    headers = {'Authorization': f'token {GITHUB_TOKEN}'} if GITHUB_TOKEN else {}
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    data = response.json()
    content = base64.b64decode(data['content']).decode('utf-8')
    sha = data['sha']
    
    return content, sha

def apply_minimal_changes(content):
    """Apply ONLY the 3 minimal changes to make addresses clickable"""
    
    print("🎯 Applying MINIMAL changes (only wrapping addresses in <a> tags)...")
    print()
    
    # Change 1: Contact section address (Line ~594)
    old_contact = '<p>Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</p>'
    new_contact = f'<p><a href="{MAPS_URL}" target="_blank" style="color: inherit; text-decoration: none;">Plot No: 335/B, Chamunda Chawl<br>Below Satguru Swami Teooramji Maharaj Overbridge<br>Near Railway Crossing, Naroda, NH-8<br>Ahmedabad, Gujarat, India</a></p>'
    
    if old_contact in content:
        content = content.replace(old_contact, new_contact)
        print("✅ Change 1: Made Contact section address clickable")
    else:
        print("⚠️  Warning: Contact section pattern not found")
    
    # Change 2: GST section address (Line ~581)
    old_gst = '<p><strong>Location:</strong> Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</p>'
    new_gst = f'<p><strong>Location:</strong> <a href="{MAPS_URL}" target="_blank" style="color: inherit; text-decoration: none;">Plot No: 335/B, Chamunda Chawl, Below Satguru Swami Teooramji Maharaj Overbridge, Near Railway Crossing, Naroda, NH-8, Ahmedabad, Gujarat, India</a></p>'
    
    if old_gst in content:
        content = content.replace(old_gst, new_gst)
        print("✅ Change 2: Made GST section address clickable")
    else:
        print("⚠️  Warning: GST section pattern not found")
    
    # Change 3: Footer address (Line ~646)
    old_footer = '<p><i class="fas fa-map-marker-alt"></i> Naroda, Ahmedabad, Gujarat</p>'
    new_footer = f'<p><i class="fas fa-map-marker-alt"></i> <a href="{MAPS_URL}" target="_blank" style="color: inherit; text-decoration: none;">Naroda, Ahmedabad, Gujarat</a></p>'
    
    if old_footer in content:
        content = content.replace(old_footer, new_footer)
        print("✅ Change 3: Made Footer address clickable")
    else:
        print("⚠️  Warning: Footer pattern not found")
    
    print()
    return content

def upload_file(content, sha):
    """Upload updated file back to GitHub"""
    url = f"https://api.github.com/repos/{REPO}/contents/{FILE_PATH}"
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    data = {
        'message': '🗺️ ADD: Clickable Google Maps links (minimal change - addresses only)',
        'content': base64.b64encode(content.encode('utf-8')).decode('utf-8'),
        'sha': sha
    }
    
    response = requests.put(url, json=data, headers=headers)
    response.raise_for_status()
    
    return response.json()

if __name__ == "__main__":
    print("=" * 70)
    print("🗺️  MINIMAL GOOGLE MAPS LINKS - NO OTHER CHANGES")
    print("=" * 70)
    print()
    
    if not GITHUB_TOKEN:
        print("❌ Error: GITHUB_TOKEN environment variable not set")
        print("   Set it with: export GITHUB_TOKEN='your_token_here'")
        exit(1)
    
    try:
        # Download current file
        print("📥 Downloading index.html...")
        content, sha = get_file_content()
        print(f"   File size: {len(content)} bytes")
        print()
        
        # Apply minimal changes
        updated_content = apply_minimal_changes(content)
        
        # Upload updated file
        print("📤 Uploading updated index.html...")
        result = upload_file(updated_content, sha)
        print("✅ Upload successful!")
        print()
        
        print("=" * 70)
        print("✅ DONE! All addresses are now clickable Google Maps links")
        print("=" * 70)
        print()
        print(f"🔗 Commit: {result['commit']['html_url']}")
        print(f"🌐 Google Maps URL: {MAPS_URL}")
        print()
        print("Changes made:")
        print("  1. Contact section address → clickable")
        print("  2. GST section address → clickable")
        print("  3. Footer location → clickable")
        print()
        print("NO other changes were made to the file.")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        exit(1)
