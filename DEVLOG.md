# Development Log

**Project:** Resume & Portfolio Generator  
**Repo:** https://github.com/RANGIRA46/resume-generator  
**Live URL:** https://resume-generator-inky.vercel.app/

## Day 1 — Project setup
- Initialized Vite + React project
- Installed Tailwind, html2canvas, jspdf

## Day 2 — Core features
- Implemented JSON editor and live preview
- Added sample JSON and JSON download/copy
- Implemented image upload (embedded as data URL)
- Added two templates (Classic, Modern)

## Day 3 — Export & deploy
- Added PDF export via html2canvas + jspdf
- Deployed to Vercel (live link above)

## Challenges & Solutions
- PDF export + external image CORS: solved by embedding uploaded images as data URLs
- Styling/print fidelity: added @media print tweaks

## Next improvements (future)
- Save/load to localStorage (persistence)
- Multi-page PDF splitting (for long resumes)
- Add basic telemetry (Sentry) and usage analytics

**Author:** BARAKA Johnson — johnsonbaraka46@gmail.com
