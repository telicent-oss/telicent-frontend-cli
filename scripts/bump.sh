#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Determine if we should push changes
PUSH=false
if [ "$1" == "--push" ]; then
  PUSH=true
fi

# Check if the current branch is 'main'
current_branch=$(git symbolic-ref --short HEAD)
if [ "$current_branch" != "main" ]; then
  echo "Bump precondition: must be on main"
  exit 1
fi

# Check if the local branch is up-to-date with the remote
git fetch origin
local_commit=$(git rev-parse @)
remote_commit=$(git rev-parse @{u})
if [ "$local_commit" != "$remote_commit" ]; then
  echo "Bump precondition: must be on head of remote"
  exit 1
fi

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "Bump precondition: no uncommitted changes"
  exit 1
fi

# Generate changelog and bump version
yarn generate-changelog # Ensure this command includes necessary updates
yarn version --new-version patch # Specify the version bump type (patch, minor, major, etc.)

# Commit the changes
git add CHANGELOG.md package.json
git commit -m "chore(release): bump version and update changelog"

if [ "$PUSH" == true ]; then
  # Push to main
  git push origin main
  git push --tags
else
  echo "Dry run: Changes committed locally but not pushed"
fi

# Create a temporary branch
timestamp=$(date +%Y%m%d%H%M%S)
tmp_branch="temp$timestamp"
git checkout -b "$tmp_branch"

# Generate changelog again if needed and commit the changes
yarn generate-changelog
git add CHANGELOG.md package.json
git commit -m "chore(release): update changelog"

# Rename the temporary branch to a version-specific branch
version_branch="version/$(node -e "console.log(require('./package.json').version)")"
git branch -m "$tmp_branch" "$version_branch"

if [ "$PUSH" == true ]; then
  # Push the renamed branch
  git push origin "$version_branch"
  git push --tags
else
  echo "Dry run: Version branch created but not pushed"
fi

# Checkout back to main
git checkout main

if [ "$PUSH" != true ]; then
  echo "Dry run complete. Use --push to actually push changes to the remote repository."
fi