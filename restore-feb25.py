#!/usr/bin/env python3
import subprocess
import sys

# Restore index.html from Feb 25 commit
commit_sha = "bee24d5a784d8778501e8d32524c5312b281f405"

print(f"Restoring index.html from commit {commit_sha}...")
subprocess.run(["git", "checkout", commit_sha, "--", "index.html"], check=True)

print("Committing restored file...")
subprocess.run(["git", "add", "index.html"], check=True)
subprocess.run(["git", "commit", "-m", "🔄 RESTORE: Complete Feb 25 website (before all today's changes)"], check=True)

print("Pushing to GitHub...")
subprocess.run(["git", "push"], check=True)

print("✅ Restoration complete!")
