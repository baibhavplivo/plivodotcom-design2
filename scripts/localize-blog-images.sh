#!/bin/bash
# Batch download Webflow CDN images and update blog post references
# This script:
# 1. Extracts all unique Webflow CDN URLs from blog posts
# 2. Downloads each image to public/images/blog/
# 3. Updates blog post .md files to use local /images/blog/ paths

set -e

PROJECT_DIR="/Volumes/Baibhav's Files/Plivo/Plivo Website - Venky"
BLOG_DIR="$PROJECT_DIR/src/content/blog"
IMG_DIR="$PROJECT_DIR/public/images/blog"
TEMP_FILE="/tmp/webflow-urls.txt"

mkdir -p "$IMG_DIR"

echo "=== Step 1: Extracting all unique Webflow CDN URLs ==="

# Extract all unique URLs from blog posts
grep -roh 'https://cdn\.prod\.website-files\.com/[^"'"'"' )\]]*' "$BLOG_DIR" | sort -u > "$TEMP_FILE"

TOTAL=$(wc -l < "$TEMP_FILE" | tr -d ' ')
echo "Found $TOTAL unique URLs"

echo ""
echo "=== Step 2: Downloading images ==="

SUCCESS=0
FAIL=0
SKIP=0

while IFS= read -r url; do
    # Decode URL to get filename - extract last path segment
    filename=$(echo "$url" | sed 's|.*/||' | python3 -c "import sys, urllib.parse; print(urllib.parse.unquote(sys.stdin.read().strip()))")

    # Clean filename: replace spaces and special chars
    clean_filename=$(echo "$filename" | sed 's/ /-/g; s/%20/-/g; s/[^a-zA-Z0-9._-]/-/g; s/--*/-/g; s/^-//; s/-$//')

    # If filename is too long, truncate but keep extension
    if [ ${#clean_filename} -gt 100 ]; then
        ext="${clean_filename##*.}"
        base="${clean_filename%.*}"
        base="${base:0:90}"
        clean_filename="${base}.${ext}"
    fi

    local_path="$IMG_DIR/$clean_filename"

    if [ -f "$local_path" ]; then
        SKIP=$((SKIP + 1))
    else
        if curl -sL --max-time 30 "$url" -o "$local_path" 2>/dev/null; then
            # Check if file is actually an image (not an error page)
            filesize=$(stat -f%z "$local_path" 2>/dev/null || echo "0")
            if [ "$filesize" -lt 100 ]; then
                rm -f "$local_path"
                echo "FAIL (too small): $clean_filename"
                FAIL=$((FAIL + 1))
            else
                SUCCESS=$((SUCCESS + 1))
            fi
        else
            echo "FAIL (download): $clean_filename"
            FAIL=$((FAIL + 1))
        fi
    fi

    DONE=$((SUCCESS + FAIL + SKIP))
    if [ $((DONE % 50)) -eq 0 ]; then
        echo "Progress: $DONE / $TOTAL (downloaded: $SUCCESS, skipped: $SKIP, failed: $FAIL)"
    fi
done < "$TEMP_FILE"

echo ""
echo "Download complete: $SUCCESS downloaded, $SKIP skipped, $FAIL failed"

echo ""
echo "=== Step 3: Updating blog post references ==="

UPDATED=0

# Process each blog post that references Webflow CDN
for mdfile in "$BLOG_DIR"/*.md; do
    if ! grep -q 'cdn\.prod\.website-files\.com' "$mdfile" 2>/dev/null; then
        continue
    fi

    # For each Webflow URL in this file, replace with local path
    while IFS= read -r url; do
        # Get the clean filename (same logic as download)
        filename=$(echo "$url" | sed 's|.*/||' | python3 -c "import sys, urllib.parse; print(urllib.parse.unquote(sys.stdin.read().strip()))")
        clean_filename=$(echo "$filename" | sed 's/ /-/g; s/%20/-/g; s/[^a-zA-Z0-9._-]/-/g; s/--*/-/g; s/^-//; s/-$//')

        if [ ${#clean_filename} -gt 100 ]; then
            ext="${clean_filename##*.}"
            base="${clean_filename%.*}"
            base="${base:0:90}"
            clean_filename="${base}.${ext}"
        fi

        local_ref="/images/blog/$clean_filename"

        # Only replace if the local file exists
        if [ -f "$IMG_DIR/$clean_filename" ]; then
            # Escape URL for sed (handle special chars)
            escaped_url=$(echo "$url" | sed 's/[&/\]/\\&/g; s/\[/\\[/g; s/\]/\\]/g')
            escaped_ref=$(echo "$local_ref" | sed 's/[&/\]/\\&/g')

            # Use perl for safer replacement (handles special chars better)
            perl -i -pe "s|\Q$url\E|$local_ref|g" "$mdfile"
        fi
    done < <(grep -oh 'https://cdn\.prod\.website-files\.com/[^"'"'"' )\]]*' "$mdfile" | sort -u)

    UPDATED=$((UPDATED + 1))
    if [ $((UPDATED % 50)) -eq 0 ]; then
        echo "Updated $UPDATED files..."
    fi
done

echo ""
echo "=== DONE ==="
echo "Updated $UPDATED blog post files"
echo "Images saved to: public/images/blog/"

# Verify no Webflow CDN references remain
REMAINING=$(grep -rl 'cdn\.prod\.website-files\.com' "$BLOG_DIR" 2>/dev/null | wc -l | tr -d ' ')
echo "Remaining files with Webflow CDN references: $REMAINING"
