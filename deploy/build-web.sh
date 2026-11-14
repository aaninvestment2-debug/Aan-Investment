#!/usr/bin/env bash
# Builds the single public website served on the main domain.
#
#   landing/  (public marketing site, CRA)  -> owns "/" and its own pages
#   frontend/ (LMS, Vite)                   -> every other path (/login, /dashboard, ...)
#
# Output: ./dist
#   index.html            landing page (served at "/")
#   <landing-route>/      a copy of the landing index.html per landing route,
#                         so a hard refresh on e.g. /services still gets the landing app
#   app.html              LMS index.html; the static host serves it for every
#                         other path (catch-all document), so the LMS router takes over
#
# Required build-time env:
#   VITE_API_BASE_URL       LMS backend base URL (e.g. https://api.aanfinance.com)
#   REACT_APP_BACKEND_URL   landing CMS backend base URL (as used by the landing today)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/dist"

# Public routes of the landing app (keep in sync with landing/src/App.js).
LANDING_ROUTES=(
  leadership about services loan-against-property business-loans
  corporate-finance why-choose-us contact compliance
)

: "${VITE_API_BASE_URL:?VITE_API_BASE_URL must be set}"
: "${REACT_APP_BACKEND_URL:?REACT_APP_BACKEND_URL must be set}"

echo "==> Building LMS (frontend/)"
cd "$ROOT/frontend"
# `npm install` (not `npm ci`): the committed lockfile is missing an optional
# platform package, which makes `npm ci` refuse to run. The lockfile is not rewritten in git.
npm install --no-audit --no-fund
npm run build

echo "==> Building landing (landing/)"
cd "$ROOT/landing"
npx --yes yarn@1.22.22 install --frozen-lockfile --non-interactive --network-timeout 600000
# CRA treats lint warnings as errors when CI=true.
CI=false GENERATE_SOURCEMAP=false npx --yes yarn@1.22.22 build

echo "==> Assembling $OUT"
rm -rf "$OUT"
mkdir -p "$OUT"
cp -R "$ROOT/frontend/dist/." "$OUT/"
mv "$OUT/index.html" "$OUT/app.html"
cp -R "$ROOT/landing/build/." "$OUT/"
for route in "${LANDING_ROUTES[@]}"; do
  mkdir -p "$OUT/$route"
  cp "$OUT/index.html" "$OUT/$route/index.html"
done

echo "==> Done"
ls -la "$OUT"
