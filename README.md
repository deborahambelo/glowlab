## GlowLab

GlowLab is a modern React + Vite app for exploring skincare, building AM/PM routines, and tracking complementary fitness and wellness content. It uses Firebase Authentication to power email/password sign-in and sign-up flows, along with protected routes for personalized features like the routine builder and dashboard.

### Tech stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Auth & data**: Firebase Authentication 

### Getting started

1. **Install dependencies**

```bash
npm install
```

2. **Configure Firebase**

This project uses Firebase for authentication and user data. The Firebase credentials are stored locally in `.env` (not committed to GitHub).  

- If you are working locally, create a `.env` file in the project root based on `.env.example`.  
- These values are already set for the hosted site, so you do **not** need your own Firebase project to run the app unless you want to test features independently.

3. **Run the dev server**

```bash
npm run dev
```

Open the printed local URL in your browser to view the app.

### Key features

- **Home, Skincare, Fitness, Blog** pages for discovery content
- **Routine Builder** with AM/PM routines saved to local storage
- **Workout planner** stored locally
- **Auth system** with:
  - Navbar sign-in button that opens an auth modal
  - `/login` page with combined sign-in/sign-up form
  - Protected routes for the routine builder and dashboard

### Scripts

- **`npm run dev`**: start the Vite development server
- **`npm run build`**: build the app for production
- **`npm run preview`**: preview the production build locally

### Project structure (high level)

- `src/App.jsx` – main routing and layout shell
- `src/pages/` – top-level pages (Home, Skincare, Fitness, Blog, Login, Dashboard, etc.)
- `src/components/` – shared UI components (layout, cards, badges)
- `src/context/AuthContext.jsx` – authentication context and helpers
- `src/firebase.js` – Firebase initialization

### Customization

- Update copy, colors, and typography in the layout components and CSS to match your brand.
- Extend `AuthContext` for additional user data or Firestore usage.
- Add more routines, wellness tools, or content sections as needed.

