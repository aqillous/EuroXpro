# EUROXPRO'27 React Project

Responsive React 18 + Vite conference platform with public pages, delegate workflows, an Approvals Hub, Explorer Quest, merch reservations and role-protected organiser administration.

## Run locally
```bash
npm install
npm run dev
```

## Build and preview
```bash
npm run build
npm run preview
```

## Deploy to Vercel
Import this folder/repository, select Vite, set build command `npm run build` and output directory `dist`. `vercel.json` includes the SPA rewrite.

## Notes
Conference settings live in `src/config.js`; LC/MC seed data lives in `src/data.js`. State and the selected demo role are persisted in localStorage. On `/login`, use **Continue as CC (Organiser)** to open `/admin`, or switch roles from the user menu. These one-click roles are for the frontend-only demo and are not authentication: role data is client-side and can be changed by a visitor. Do not use this access control for production or real delegate data; replace it with server-side authentication and authorization.
