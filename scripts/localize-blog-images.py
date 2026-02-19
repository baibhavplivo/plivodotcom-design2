#!/usr/bin/env python3
"""
Batch download Webflow CDN images and update blog post references.
1. Scans all .md files in src/content/blog/ for Webflow CDN URLs
2. Downloads each unique image to public/images/blog/
3. Replaces CDN URLs with local /images/blog/ paths in the .md files
"""

import os
import re
import hashlib
import urllib.parse
import urllib.request
import ssl
import sys

PROJECT_DIR = "/Volumes/Baibhav's Files/Plivo/Plivo Website - Venky"
BLOG_DIR = os.path.join(PROJECT_DIR, "src", "content", "blog")
IMG_DIR = os.path.join(PROJECT_DIR, "public", "images", "blog")

# Regex to find Webflow CDN URLs
CDN_PATTERN = re.compile(r'https://cdn\.prod\.website-files\.com/[^\s"\')\]]+')

# SSL context for downloads
ssl_ctx = ssl.create_default_context()

def url_to_filename(url):
    """Convert a CDN URL to a clean local filename."""
    # Parse URL and get the path
    parsed = urllib.parse.urlparse(url)
    path = urllib.parse.unquote(parsed.path)

    # Get just the filename (last segment)
    filename = os.path.basename(path)

    # Clean: replace spaces and special chars with hyphens
    filename = re.sub(r'[^a-zA-Z0-9._-]', '-', filename)
    filename = re.sub(r'-+', '-', filename)
    filename = filename.strip('-')

    # If filename is too long, use hash prefix + truncated name
    if len(filename) > 120:
        ext = os.path.splitext(filename)[1]
        name = os.path.splitext(filename)[0][:80]
        url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
        filename = f"{name}-{url_hash}{ext}"

    # If no extension, try to determine from URL
    if '.' not in filename:
        filename += '.png'

    return filename


def download_image(url, local_path):
    """Download image from URL to local path."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        })
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=30) as response:
            data = response.read()
            if len(data) < 100:
                return False
            with open(local_path, 'wb') as f:
                f.write(data)
            return True
    except Exception as e:
        print(f"  FAIL: {e}")
        return False


def main():
    os.makedirs(IMG_DIR, exist_ok=True)

    # Step 1: Scan all blog posts for CDN URLs
    print("=== Step 1: Scanning blog posts for Webflow CDN URLs ===")

    url_to_files = {}  # url -> set of files that reference it
    file_urls = {}     # file -> list of urls

    md_files = sorted([f for f in os.listdir(BLOG_DIR) if f.endswith('.md')])

    for md_file in md_files:
        filepath = os.path.join(BLOG_DIR, md_file)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        urls = CDN_PATTERN.findall(content)
        if urls:
            file_urls[filepath] = urls
            for url in urls:
                # Clean trailing quotes or punctuation
                url = url.rstrip('"').rstrip("'").rstrip(')')
                if url not in url_to_files:
                    url_to_files[url] = set()
                url_to_files[url].add(filepath)

    unique_urls = sorted(url_to_files.keys())
    print(f"Found {len(unique_urls)} unique URLs across {len(file_urls)} blog posts")

    # Step 2: Download all unique images
    print(f"\n=== Step 2: Downloading {len(unique_urls)} images ===")

    url_to_local = {}  # mapping from CDN URL to local /images/blog/filename
    success = 0
    fail = 0
    skip = 0

    for i, url in enumerate(unique_urls):
        filename = url_to_filename(url)
        local_path = os.path.join(IMG_DIR, filename)
        local_ref = f"/images/blog/{filename}"

        if os.path.exists(local_path) and os.path.getsize(local_path) > 100:
            url_to_local[url] = local_ref
            skip += 1
        else:
            if download_image(url, local_path):
                url_to_local[url] = local_ref
                success += 1
            else:
                fail += 1
                print(f"  Failed: {filename}")

        done = i + 1
        if done % 50 == 0 or done == len(unique_urls):
            print(f"  Progress: {done}/{len(unique_urls)} (downloaded: {success}, skipped: {skip}, failed: {fail})")

    print(f"\nDownload complete: {success} new, {skip} skipped, {fail} failed")

    # Step 3: Update blog post references
    print(f"\n=== Step 3: Updating {len(file_urls)} blog posts ===")

    updated = 0
    for filepath in sorted(file_urls.keys()):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # Sort URLs by length descending to avoid partial replacements
        for url in sorted(url_to_local.keys(), key=len, reverse=True):
            if url in content:
                content = content.replace(url, url_to_local[url])

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated += 1

        if updated % 100 == 0 and updated > 0:
            print(f"  Updated {updated} files...")

    print(f"\nUpdated {updated} blog post files")

    # Step 4: Verify
    print(f"\n=== Verification ===")
    remaining = 0
    for md_file in md_files:
        filepath = os.path.join(BLOG_DIR, md_file)
        with open(filepath, 'r', encoding='utf-8') as f:
            if 'cdn.prod.website-files.com' in f.read():
                remaining += 1

    print(f"Files still referencing Webflow CDN: {remaining}")

    # Show disk usage
    total_size = sum(
        os.path.getsize(os.path.join(IMG_DIR, f))
        for f in os.listdir(IMG_DIR)
        if os.path.isfile(os.path.join(IMG_DIR, f))
    )
    print(f"Total images downloaded: {len(os.listdir(IMG_DIR))} files, {total_size / 1024 / 1024:.1f} MB")

    print("\n=== DONE ===")


if __name__ == '__main__':
    main()
