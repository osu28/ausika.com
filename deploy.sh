#!/bin/bash -e

# Environment variables
BUCKET="ausika.com"
DISTRIBUTION_ID="EX4GKU4C8N50Q"

# Build the Next.js app
npm run build

# Set the output directory
OUT_DIR=out

# Sync non-HTML files
aws s3 sync $OUT_DIR s3://$BUCKET/ \
  --delete \
  --exclude "*.html" \
  --metadata-directive REPLACE \
  --cache-control max-age=31536000,public

# Copy HTML files and service worker
aws s3 cp $OUT_DIR s3://$BUCKET/ \
  --exclude "*" \
  --include "*.html" \
  --include "$OUT_DIR/sw.js" \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,no-store,must-revalidate \
  --recursive

# Copy HTML files without .html extension
copy_html_files() {
  for html_file in $(find $OUT_DIR -name "*.html"); do
    relative_path=${html_file#$OUT_DIR/}
    destination_path=${relative_path%.html}
    aws s3 cp $html_file s3://$BUCKET/$destination_path \
      --content-type "text/html" \
      --metadata-directive REPLACE \
      --cache-control max-age=0,no-cache,no-store,must-revalidate
  done
}

# Call the function after other S3 operations
copy_html_files

# Create CloudFront invalidation
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"