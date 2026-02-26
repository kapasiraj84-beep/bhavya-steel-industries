#!/bin/bash
# This script restores index.html to the version before Google Maps changes

# Fetch the clean version from commit bee24d5
curl -o index.html https://raw.githubusercontent.com/kapasiraj84-beep/bhavya-steel-industries/bee24d5a784d8778501e8d32524c5312b281f405/index.html

echo "✅ Restored index.html to clean version (before Google Maps changes)"
echo "📝 Please commit this file to complete the restoration"
