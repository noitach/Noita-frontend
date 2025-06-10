#!/bin/bash

echo "🚀 Starting test script..."

set -eu

# Check if there is an active account
echo "🕵️ Checking for active gcloud account..."
ACCOUNT=$(gcloud auth list --filter=status:ACTIVE --format="value(account)")

if [[ -z "$ACCOUNT" ]]; then
  echo "🤔 No active gcloud account found. Initiating authentication..."
  gcloud auth login
  echo "✅ gcloud authentication complete."
else
  echo "👍 Already authenticated as: $ACCOUNT"
fi

echo "🐳 Configuring Docker with gcloud..."
gcloud auth configure-docker europe-west1-docker.pkg.dev
echo " настроено Docker configuration complete."

echo "🚢 Bringing up Docker Compose services..."
docker compose up --build --renew-anon-volumes
echo "🎉 Docker Compose services are up."
