# EUROXPRO'27 React Project

Responsive React 18 + Vite conference demo with public pages, delegate workflows, an Approvals Hub, Explorer Quest, merch reservations, and a role-protected organiser control centre. The public store and quest preview are available from the main navigation; delegate actions require demo sign-in. All demo content is illustrative and stored in the browser; this project has no backend.

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
## Source structure
- `src/app/` — application entry composition
- `src/components/` — reusable UI, charts, illustrations, and accessible modal
- `src/data/` — fake LC, delegate, programme, store, quest, and announcement data
- `src/layouts/` — shared navigation, page routes, and footer
- `src/pages/` — page-level components grouped by feature
- `src/store/` — context-based app state and localStorage persistence
- `src/utils/` — shared formatting and downloads

Conference settings start in `src/config.js` and can be edited in the organiser control centre. On `/login`, use **Continue as CC (Organiser)** to open `/admin`. The control centre manages demo registrations/users, committee targets, programme sessions, store products and reservations, quest stations/rewards/claims, announcements, and conference settings. Changes are saved in this browser; restore the sample data from Conference settings. These one-click roles are for a frontend-only demo and are not authentication: role data is client-side and can be changed by a visitor. Do not use this access control for production or real delegate data; replace it with server-side authentication and authorization.
