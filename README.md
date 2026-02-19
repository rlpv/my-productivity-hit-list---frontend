# Frontend - My Productivity Hit List

React frontend for the Productivity Hit List application.

---

## Features

- **User Authentication** - Login, register, logout flows
- **Task Management** - Create, edit, delete, complete tasks
- **Task Analytics** - View completion statistics
- **Responsive Design** - Works on desktop and mobile
- **Toast Notifications** - Real-time user feedback
- **Protected Routes** - Authenticated access to features
- **Terms Acceptance** - Required acceptance before signup

---

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create environment file:**

   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables:**

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

---

## Modules

| Module                                                            | Description                    |
| ----------------------------------------------------------------- | ------------------------------ |
| [`App.tsx`](src/App.tsx)                                          | Root component with routing    |
| [`authStore.ts`](src/store/authStore.ts)                          | Authentication state (Zustand) |
| [`taskStore.ts`](src/store/taskStore.ts)                          | Task state (Zustand)           |
| [`axios-instance.ts`](src/axios/axios-instance.ts)                | Axios client with interceptors |
| [`auth.api.ts`](src/api/auth.api.ts)                              | Auth API calls                 |
| [`task.api.ts`](src/api/task.api.ts)                              | Task API calls                 |
| [`ProtectedRoute.tsx`](src/components/routing/ProtectedRoute.tsx) | Auth guard component           |
| [`Toast.tsx`](src/components/general/Toast.tsx)                   | Notification component         |

---

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```
