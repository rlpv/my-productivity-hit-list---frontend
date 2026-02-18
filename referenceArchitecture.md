## Project Structure Overview

## Backend Structure (`backend/`)

The backend follows a layered architecture pattern:

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── account/      # Account-related endpoints
│   │   ├── auth/         # Authentication endpoints
│   │   ├── todo/         # Todo CRUD endpoints
│   │   └── token/        # Token management endpoints
│   │
│   ├── db/               # Database connection
│   │   └── db.connect.ts # MongoDB connection setup
│   │
│   ├── middlewares/      # Express middleware
│   │   ├── global-error-handler.middleware.ts  # Centralized error handling
│   │   ├── limiter.middleware.ts               # Rate limiting
│   │   └── token.middleware.ts                 # JWT token validation
│   │
│   ├── models/           # Mongoose data models
│   │   ├── account/       # User account model
│   │   └── todo/          # Todo item model
│   │
│   ├── routes/           # Express router definitions
│   │   ├── account/      # Account routes
│   │   ├── auth/         # Auth routes
│   │   ├── todo/         # Todo routes
│   │   └── token/        # Token routes
│   │
│   ├── services/         # Business logic layer
│   │   ├── account/      # Account service logic
│   │   ├── todo/         # Todo service logic
│   │   └── token/        # Token service logic
│   │
│   ├── types/            # TypeScript type definitions
│   │   └── models/       # Model-specific types
│   │       ├── account.type.ts
│   │       └── todo.type.ts
│   │
│   ├── utils/            # Utility functions
│   │   ├── bcrypt/       # Password hashing utilities
│   │   ├── cookie/       # Cookie management
│   │   ├── error/        # Error handling utilities
│   │   ├── jwt/          # JWT token utilities
│   │   └── session/      # Session management
│   │
│   └── index.ts          # Application entry point
│
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
├── package-lock.json     # Locked dependencies
└── tsconfig.json         # TypeScript configuration
```

### Backend Layer Description

| Layer           | Purpose                                                            |
| --------------- | ------------------------------------------------------------------ |
| **Controllers** | Handle HTTP requests/responses, input validation                   |
| **Services**    | Contain business logic, interact with models                       |
| **Models**      | Define Mongoose schemas, database interactions                     |
| **Routes**      | Define API endpoints, map to controllers                           |
| **Middlewares** | Process requests before reaching controllers (auth, rate limiting) |
| **Utils**       | Reusable helper functions (JWT, bcrypt, cookies)                   |
| **Types**       | TypeScript interfaces and types                                    |

---

## Frontend Structure (`frontend/`)

The frontend follows a feature-based folder organization:

```
frontend/
├── public/                  # Static public assets
│   └── vite.svg
│
├── src/
│   ├── api/                 # API call functions
│   │   ├── account/         # Account API calls
│   │   ├── auth/            # Auth API calls
│   │   ├── todo/            # Todo API calls
│   │   └── token/           # Token API calls
│   │
│   ├── assets/              # Static assets (images, fonts)
│   │   └── react.svg
│   │
│   ├── axios/               # Axios instance configuration
│   │   └── axios-instance.ts  # Global axios setup with interceptors
│   │
│   ├── components/          # Reusable React components
│   │   ├── general/         #通用组件
│   │   │   ├── BackToLandingPage.tsx
│   │   │   ├── SplashScreen.tsx
│   │   │   └── modals/      # Modal components
│   │   │       ├── FormModal.tsx
│   │   │       └── ModalShell.tsx
│   │   ├── header/          # Header component
│   │   │   └── Header.tsx
│   │   ├── home/            # Home page components
│   │   │   └── todo/        # Todo-related components
│   │   │       ├── TodoCard.tsx
│   │   │       ├── TodosEmptyState.tsx
│   │   │       ├── TodosHeader.tsx
│   │   │       ├── TodoSkeletonList.tsx
│   │   │       ├── TodosPanel.tsx
│   │   │       ├── TodosToolbar.tsx
│   │   │       └── modals/  # Todo modals
│   │   │           ├── AddTodoModal.tsx
│   │   │           ├── DeleteTodoModal.tsx
│   │   │           └── UpdateTodoModal.tsx
│   │   ├── input/           # Input components
│   │   │   └── CustomInput.tsx
│   │   └── logout/          # Logout button component
│   │       └── LogoutBtn.tsx
│   │
│   ├── constants/           # Application constants
│   │   └── overlay/         # Overlay animations
│   │       └── overlay-animation.ts
│   │
│   ├── layouts/             # Layout components
│   │   ├── app/             # App-wide layout
│   │   │   └── AppLayout.tsx
│   │   ├── auth/            # Auth pages layout
│   │   │   └── AuthLayout.tsx
│   │   └── home/            # Home page layout
│   │       └── HomeLayout.tsx
│   │
│   ├── pages/               # Page components
│   │   ├── auth/            # Authentication pages
│   │   │   ├── login/       # Login page
│   │   │   │   └── LoginPage.tsx
│   │   │   └── register/    # Registration page
│   │   │       └── RegisterPage.tsx
│   │   ├── general/         # General pages
│   │   │   ├── LandingPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   └── home/            # Home page
│   │       └── HomePage.tsx
│   │
│   ├── routes/              # Route definitions
│   │   ├── auth/            # Auth routes
│   │   │   └── auth.route.ts
│   │   └── home/            # Home routes
│   │       └── home.route.ts
│   │
│   ├── stores/              # State management (Zustand)
│   │   ├── account/         # Account state
│   │   ├── auth/            # Auth state
│   │   ├── todo/            # Todo state
│   │   └── token/           # Token state
│   │
│   ├── types/               # TypeScript type definitions
│   │   ├── account/
│   │   ├── auth/
│   │   ├── todo/
│   │   └── token/
│   │
│   ├── utils/               # Utility functions
│   │   └── error/           # Error handling utilities
│   │
│   ├── App.tsx              # Root App component
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
│
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── package-lock.json        # Locked dependencies
├── tsconfig.json            # TypeScript base config
├── tsconfig.app.json        # TypeScript app config
├── tsconfig.node.json       # TypeScript Node config
└── vite.config.ts           # Vite configuration
```

### Frontend Layer Description

| Layer          | Purpose                                                      |
| -------------- | ------------------------------------------------------------ |
| **API**        | Functions that make HTTP requests to the backend             |
| **Axios**      | Configured axios instance with request/response interceptors |
| **Components** | Reusable UI components (buttons, inputs, modals)             |
| **Layouts**    | Page layout wrappers (auth, home, app)                       |
| **Pages**      | Full page components that represent routes                   |
| **Routes**     | Route definitions and guards                                 |
| **Stores**     | Global state management using Zustand                        |
| **Types**      | TypeScript interfaces matching backend types                 |
| **Utils**      | Helper functions                                             |
