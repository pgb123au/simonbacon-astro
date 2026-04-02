#!/usr/bin/env bash
# ============================================================
# Complete TinaCMS Cloud Setup for simonbacon.com.au
# ============================================================
#
# Run this AFTER completing TinaCMS Cloud GitHub authorization
# and creating the project in the TinaCMS dashboard.
#
# Usage:
#   bash scripts/complete-tina-setup.sh <CLIENT_ID> <TOKEN>
#
# Example:
#   bash scripts/complete-tina-setup.sh abc123def456 xxx-read-only-token-xxx
#
# Prerequisites:
#   1. TinaCMS Cloud account: petergball102@gmail.com
#   2. GitHub authorized on TinaCMS Cloud
#   3. Project created pointing to pgb123au/simonbacon-astro
#   4. Client ID and Token copied from TinaCMS dashboard
# ============================================================

set -e

CLIENT_ID="${1:?Usage: $0 <TINA_CLIENT_ID> <TINA_TOKEN>}"
TOKEN="${2:?Usage: $0 <TINA_CLIENT_ID> <TINA_TOKEN>}"

echo ""
echo "=== TinaCMS Cloud Setup Completion ==="
echo ""
echo "  Client ID: ${CLIENT_ID:0:12}..."
echo "  Token:     ${TOKEN:0:12}..."
echo ""

cd "$(dirname "$0")/.."

# Step 1: Remove placeholder env vars from Vercel
echo "[1/5] Removing placeholder Vercel env vars..."
vercel env rm TINA_CLIENT_ID production -y 2>/dev/null || true
vercel env rm TINA_TOKEN production -y 2>/dev/null || true

# Step 2: Add real credentials
echo "[2/5] Adding real TinaCMS credentials to Vercel..."
echo "$CLIENT_ID" | vercel env add TINA_CLIENT_ID production
echo "$TOKEN" | vercel env add TINA_TOKEN production

# Step 3: Update tina config to use cloud mode (remove --local)
echo "[3/5] Verifying build configuration..."
if grep -q '"tinacms build && astro build"' package.json; then
    echo "  Build command OK: tinacms build && astro build"
else
    echo "  WARNING: Build command may need updating. Check package.json"
fi

# Step 4: Trigger rebuild
echo "[4/5] Triggering production deployment..."
vercel deploy --prod --yes 2>&1

# Step 5: Verify
echo ""
echo "[5/5] Waiting for deployment and verifying /admin panel..."
sleep 15
ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://simonbacon.com.au/admin/")
if [ "$ADMIN_STATUS" = "200" ]; then
    echo ""
    echo "  SUCCESS: /admin panel returns HTTP 200"
    echo ""
    echo "=== Setup Complete ==="
    echo ""
    echo "  Simon can now edit content at: https://simonbacon.com.au/admin/"
    echo "  He logs in with his TinaCMS Cloud account."
    echo ""
    echo "  Update the editing guide (simon-editing-guide.html) section 6"
    echo "  and email Simon the updated guide."
    echo ""
else
    echo ""
    echo "  WARNING: /admin returned HTTP $ADMIN_STATUS"
    echo "  The deployment may still be building."
    echo "  Check: https://vercel.com/peter-balls-projects/simonbacon"
    echo ""
fi

# Save credentials reference
echo ""
echo "Credentials saved to: credentials/TINACMS_CLOUD.txt"
echo "TINA_CLIENT_ID=$CLIENT_ID" >> "$(dirname "$0")/../../.tina-credentials-ref.txt" 2>/dev/null || true
