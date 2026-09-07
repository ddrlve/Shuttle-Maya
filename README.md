# Shuttle Maya

Shuttle Maya is a responsive shuttle booking MVP for BINUS Bandung Accommodation Shuttle from BINUS Paskal <-> Dago Campus. It uses the Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui-style primitives, lucide-react icons, dummy data, React state, and `localStorage`.

## Routes

- `/landing` landing page
- `/login` dummy login
- `/onboarding` onboarding carousel
- `/register` dummy register
- `/` dashboard
- `/booking` booking flow
- `/tickets` active and history tickets
- `/community` community shuttle request
- `/scan` fake QR scanner
- `/profile` profile and settings placeholders
- `/success` booking success ticket

Legacy prototype routes under `/book/*` redirect to the polished MVP flow.

## Project Structure

```text
src/
  app/                 App Router routes and metadata icons
  components/          Reusable UI and app components
  components/ui/       shadcn/ui-style primitives
  lib/                 Dummy data, booking context, storage helpers
public/
  logo.png             Web/app logo used by the UI
figma/
  *.png                Figma exports and visual references
  all_layers.css       Figma CSS export reference
docs/
  hci-report.pdf       HCI report/reference document
```

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Use the default Next.js settings.
4. Build command: `npm run build`
5. Output directory: leave default for Next.js.

Do not commit `node_modules`, `.next`, `.env`, `.env.local`, or `.vercel`.

## Current Limitations

- No backend or database yet.
- Tickets and community requests are stored in the current browser only.
- QR scan is simulated and does not use a camera API.
- Authentication, notifications, approval workflows, and admin tools are placeholders.
- Map preview is a local visual route mock, not a live map provider.

## Future Backend Improvements

- Add BINUS SSO or secure student authentication.
- Persist bookings, seats, and community requests in a database.
- Add server-side seat locking to prevent double booking.
- Add admin approval for community shuttle requests.
- Integrate real QR validation and driver scanning.
- Connect a map provider or campus route service for live shuttle positions.
