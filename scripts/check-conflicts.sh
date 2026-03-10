#!/usr/bin/env bash
set -euo pipefail

# We intentionally check only definitive Git conflict markers to avoid false positives
# from markdown underline headings like =======.
if rg -n "^(<<<<<<< |>>>>>>> )" -S . --glob '!node_modules/**' >/tmp/conflicts.txt; then
  echo "❌ Merge conflict markers found:"
  cat /tmp/conflicts.txt
  exit 1
fi

echo "✅ No merge conflict markers detected."
