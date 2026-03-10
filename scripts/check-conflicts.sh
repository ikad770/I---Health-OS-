#!/usr/bin/env bash
set -euo pipefail

if rg -n "^(<<<<<<<|=======|>>>>>>>)" -S . >/tmp/conflicts.txt; then
  echo "❌ Merge conflict markers found:"
  cat /tmp/conflicts.txt
  exit 1
fi

echo "✅ No merge conflict markers detected."
