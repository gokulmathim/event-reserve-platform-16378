# EventReserve Frontend (Astro)

Modern, minimalistic, responsive UI for browsing events, booking tickets, and managing reservations. Integrates with backend API on port 3001.

## Quick start

1) Install
- npm install

2) Configure environment
- Copy .env.example to .env and adjust as needed
- PUBLIC_API_BASE (default: http://localhost:3001)

3) Run
- npm run dev
- Open http://localhost:3000

## Features
- Event listing with search
- Event detail page and booking flow (summary modal)
- User registration and login
- My Account with bookings management (cancel)
- Organizer dashboard (create events, view stats)
- Light/Dark theme toggle
- Responsive layout and accessible components

## Tech
- Astro 5
- Minimal CSS, no heavy UI frameworks
- Fetch-based API client with auth header

## Structure
- src/pages: routes (/, /events/[id], /login, /register, /account, /organizer)
- src/components: Navbar, Footer, EventCard, BookingSummaryModal, ThemeToggle
- src/lib: config (env + fetch helper), api (endpoint methods)
- src/styles: theme.css (design tokens and utilities)
