# APX Fire & Security Website

Light-mode version of the APX site, rebranded for **APX Fire & Security** (fire safety, CCTV, access control, life safety).

- **Run locally:** `npm run dev` — dev server runs on **port 3002** so you can run the MEP site on 3001 at the same time.
- **Switch link:** “Switch to APX MEP” in the header goes to the MEP site. Set `NEXT_PUBLIC_APX_MEP_URL` (e.g. `http://localhost:3001`) if needed.
- **Theme:** Default theme is **light** (no dark mode toggle).

On the MEP site, “Switch to APX Fire & Security” links to this site; set `NEXT_PUBLIC_APX_FS_URL` (e.g. `http://localhost:3002`) there for local dev.
