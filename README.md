💎 Elegant Surfaces | Premium Tile Gallery

Welcome to Elegant Surfaces, a modern, luxurious Single Page Application (SPA) designed to showcase premium architectural tiles and ceramics.

🔗 Live URLs

Frontend (Vercel): https://assignment-8-5ajj.vercel.app
Backend API (JSON Server): https://elegant-backend-edbc.onrender.com

🎯 Project Purpose

The purpose of this project is to provide users with a seamless, highly responsive browsing experience to discover high-end interior surfaces. It features a secure authentication system that gates premium content ("View Details"), a dynamic gallery with live search filtering, and a premium user dashboard for managing profile information. As a true SPA, it ensures flawless, zero-refresh routing without throwing errors on page reloads.

✨ Key Features

Secure Authentication: Full email/password registration and Google Social Login utilizing BetterAuth and MongoDB.
2. Protected Routes: Private pages (like the Profile Dashboard and Tile Details) are strictly protected using Next.js Middleware.
3. Content Gating: Unauthenticated users are gracefully redirected to the login page when attempting to view premium tile details.
4. Dynamic Gallery & Search: Fetches 36 unique tile collections from a live JSON server, featuring instant title-search filtering.
5. New Arrivals System: Custom URL parameters (`?filter=new`) dynamically sort and display the 12 newest additions to the catalog.
6. Premium User Dashboard: A dedicated profile page allowing users to seamlessly update their display name and profile avatar URL.
7. Fully Responsive Design: A flawless split-screen UI and glassmorphism navbar optimized for Mobile, Tablet, and Desktop screens.

📦 Technologies & NPM Packages Used

1. Framework: `next` (Next.js 14/15 App Router)
2. Authentication: `better-auth` (with Google OAuth)
3. Database Adapter: `mongodb` 
4. UI/Carousels: `swiper` (SwiperJS for premium touch-slider banners)
5. Notifications: `react-hot-toast` (Client-side rendered for hydration safety) 
6. Icons: `react-icons`
7. Styling: `tailwindcss` & `daisyui`

