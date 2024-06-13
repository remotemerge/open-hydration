#!/bin/bash

# List of packages to exclude from the update
EXCLUDED_PACKAGES="-x eslint"

# Check if the first argument is "update"
if [ "$1" == "update" ]; then
  # Update the packages
  npx npm-check-updates "$EXCLUDED_PACKAGES" -u
  npm install
else
  # Check for updates
  npx npm-check-updates "$EXCLUDED_PACKAGES"
fi
