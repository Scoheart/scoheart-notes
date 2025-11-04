#!/usr/bin/env bash
set -euo pipefail

# Usage: ./rewrite-identities.sh "New Name" "new@example.com" [/path/to/repo] [remote-name]
# - New Name: 目标统一作者/提交者名字
# - new@example.com: 目标统一邮箱
# - /path/to/repo: 可选，默认当前目录
# - remote-name: 可选，默认 origin

NEW_NAME="${1:-}"
NEW_EMAIL="${2:-}"
REPO_DIR="${3:-$(pwd)}"
REMOTE_NAME="${4:-origin}"

if [[ -z "$NEW_NAME" || -z "$NEW_EMAIL" ]]; then
  echo "Usage: $0 \"New Name\" \"new@example.com\" [/path/to/repo] [remote-name]" >&2
  exit 1
fi

# Preflight: ensure repo exists
if [[ ! -d "$REPO_DIR/.git" ]]; then
  echo "Error: $REPO_DIR is not a git repository" >&2
  exit 1
fi

# Ensure PATH includes pipx and Homebrew bin
export PATH="$HOME/.local/bin:/opt/homebrew/bin:$PATH"
# Check git filter-repo availability
if ! command -v git-filter-repo >/dev/null 2>&1 && ! git -C "$REPO_DIR" filter-repo --help >/dev/null 2>&1; then
  echo "Error: git filter-repo is not installed or not on PATH." >&2
  echo "Install via: pipx install git-filter-repo   (recommended)" >&2
  echo "Or:          pip install git-filter-repo" >&2
  echo "Then rerun this script." >&2
  exit 1
fi

# Ensure clean working tree
if [[ -n "$(git -C "$REPO_DIR" status --porcelain)" ]]; then
  echo "Error: Working tree not clean. Commit/stash changes before rewriting history." >&2
  exit 1
fi

echo "Repository: $REPO_DIR"
echo "Remote:     $REMOTE_NAME"
echo "Target identity: \"$NEW_NAME\" <$NEW_EMAIL>"

echo
echo "Unique authors before rewrite:"
git -C "$REPO_DIR" log --format='%aN <%aE>' | sort -u | sed 's/^/  /'

# Optional: create a local backup as a bare mirror next to repo
BACKUP_DIR="${REPO_DIR%/}.backup.mirror.git"
if [[ ! -d "$BACKUP_DIR" ]]; then
  echo
  echo "Creating backup mirror at: $BACKUP_DIR"
  git -C "$REPO_DIR" clone --mirror "$REPO_DIR" "$BACKUP_DIR"
fi

echo
echo "Rewriting history with git filter-repo..."
# Perform the rewrite: set author/committer name/email for every commit
git -C "$REPO_DIR" filter-repo --force --commit-callback "
commit.author_name = b\"$NEW_NAME\"
commit.author_email = b\"$NEW_EMAIL\"
commit.committer_name = b\"$NEW_NAME\"
commit.committer_email = b\"$NEW_EMAIL\"
"

echo
echo "Unique authors after rewrite:"
git -C "$REPO_DIR" log --format='%aN <%aE>' | sort -u | sed 's/^/  /'

echo
echo "Updating local git config to match new identity (for future commits)..."
git -C "$REPO_DIR" config user.name "$NEW_NAME"
git -C "$REPO_DIR" config user.email "$NEW_EMAIL"

echo
echo "If pushing to a shared remote, you will need to force-push:"
echo "  git -C \"$REPO_DIR\" push $REMOTE_NAME --force --all"
echo "  git -C \"$REPO_DIR\" push $REMOTE_NAME --force --tags"

echo
echo "After force-push:"
echo "- Collaborators must re-clone or hard reset to the new history:"
echo "    git fetch $REMOTE_NAME"
echo "    git reset --hard $REMOTE_NAME/MAIN_BRANCH"
echo "- Protected branches may block force-push; adjust repo settings if needed."
echo "- Consider running 'git gc' later to clean unreachable objects."

echo
echo "Done."
