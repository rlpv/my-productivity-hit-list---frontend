# Frontend Architecture - Current Structure

Based on `frontend/referenceArchitecture.md` folder structure.

---

## Current Structure

```
frontend/src/
├── axios/
│   └── axios-instance.ts
│
├── components/
│   ├── general/
│   │   ├── Toast.tsx
│   │   └── modals/
│   │       ├── AlertModal.tsx
│   │       ├── DeleteConfirmModal.tsx
│   │       ├── LogoutModal.tsx
│   │       ├── SuccessModal.tsx
│   │       └── TaskModal.tsx
│   │
│   ├── header/
│   │   ├── Header.tsx
│   │   └── HamburgerMenu.tsx
│   │
│   ├── home/
│   │   └── task/
│   │       ├── AddButton.tsx
│   │       ├── AnalyticsBox.tsx
│   │       ├── Concard.tsx
│   │       ├── TaskForm.tsx
│   │       ├── TaskItem.tsx
│   │       └── TaskList.tsx
│   │
│   ├── input/
│   │   └── InputField.tsx
│   │
│   ├── routing/
│   │   └── ProtectedRoute.tsx
│   │
│   ├── social/
│   │   └── SocialIcons.tsx
│   │
│   └── ui/
│       └── Button.tsx
│
├── pages/
│   ├── auth/
│   │   ├── changepass/
│   │   │   ├── Changepass.tsx
│   │   │   ├── ChangepassVerify.tsx
│   │   │   └── Verifycode.tsx
│   │   ├── forgotpass/
│   │   │   └── Forgotpass.tsx
│   │   ├── login/
│   │   │   └── Login.tsx
│   │   ├── register/
│   │   │   └── Createaccount.tsx
│   │   └── setnewpass/
│   │       └── Setnewpass.tsx
│   │
│   ├── general/
│   │   ├── Landingpage.tsx
│   │   ├── Signup.tsx
│   │   └── Termscond.tsx
│   │
│   └── home/
│       ├── Addtask.tsx
│       ├── Edittask.tsx
│       └── Homepage.tsx
│
├── api/                         # For API calls (optional)
├── assets/
│   ├── logomain.png
│   └── react.svg
│
├── stores/                      # For state management (optional)
│
├── types/                       # Not needed
│
├── utils/
│   ├── auth.ts
│   └── forms/
│       ├── button.tsx
│       ├── CreateaccountForm.tsx
│       └── LoginForm.tsx
│
├── App.tsx
├── index.css
└── main.tsx
```

---

## Summary

### Components Structure

| Folder                       | Purpose                    |
| ---------------------------- | -------------------------- |
| `components/general/`        | General components (Toast) |
| `components/general/modals/` | Modal components           |
| `components/header/`         | Header and menu components |
| `components/home/task/`      | Task-related components    |
| `components/input/`          | Input components           |
| `components/routing/`        | Routing components         |
| `components/social/`         | Social icons               |
| `components/ui/`             | UI components (Button)     |

### Pages Structure

| Folder                   | Purpose               |
| ------------------------ | --------------------- |
| `pages/auth/login/`      | Login page            |
| `pages/auth/register/`   | Register page         |
| `pages/auth/forgotpass/` | Forgot password page  |
| `pages/auth/changepass/` | Change password pages |
| `pages/auth/setnewpass/` | Set new password page |
| `pages/general/`         | General pages         |
| `pages/home/`            | Home pages            |

---

_Last Updated: 2026-02-18_
