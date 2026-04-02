#!/usr/bin/env bash
# Complete TinaCMS Cloud setup for simonbacon.com.au
# Run this AFTER completing the TinaCMS Cloud GitHub authorization
#
# Usage: bash scripts/complete-tina-setup.sh <CLIENT_ID> <TOKEN>
#
# Example:
#   bash scripts/complete-tina-setup.sh abc123def456 xxx-read-only-token-xxx

set -e

CLIENT_ID="${1:?Usage: $0 <TINA_CLIENT_ID> <TINA_TOKEN>}"
TOKEN="${2:?Usage: $0 <TINA_CLIENT_ID> <TINA_TOKEN>}"

echo "=== TinaCMS Cloud Setup Completion ==="
echo ""
echo "Client ID: ${CLIENT_ID:0:8}..."
echo "Token: ${TOKEN:0:8}..."
echo ""

# Step 1: Remove placeholder env vars from Vercel
echo "[1/4] Removing placeholder Vercel env vars..."
cd "$(dirname "$0")/.."
vercel env rm TINA_CLIENT_ID production -y 2>/dev/null || true
vercel env rm TINA_TOKEN production -y 2>/dev/null || true

# Step 2: Add real credentials
echo "[2/4] Adding real TinaCMS credentials to Vercel..."
echo "$CLIENT_ID" | vercel env add TINA_CLIENT_ID production
echo "$TOKEN" | vercel env add TINA_TOKEN production

# Step 3: Trigger rebuild
echo "[3/4] Triggering production deployment..."
vercel deploy --prod

# Step 4: Verify
echo ""
echo "[4/4] Verifying /admin panel..."
sleep 10
ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://simonbacon.com.au/admin/")
if [ "$ADMIN_STATUS" = "200" ]; then
    echo "SUCCESS: /admin panel returns 200"
    echo ""
    echo "=== Setup Complete ==="
    echo "Simon can now edit content at: https://simonbacon.com.au/admin/"
else
    echo "WARNING: /admin returned HTTP $ADMIN_STATUS"
    echo "The deployment may still be building. Check https://vercel.com/peter-balls-projects/simonbacon"
fi
