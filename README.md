# Expense Tracker Frontend

This is the frontend of the Expense Tracker application, built using React, Redux, and TailwindCSS. It allows users to manage their income and expenses efficiently.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [Development](#development)

---

## Features

- User authentication (Signup/Login)
- Add, edit, and delete transactions
- View transaction summary (income, expenses, and balance)
- Protected routes for authenticated users
- Responsive design with TailwindCSS
- Toast notifications for user feedback

---

## Folder Structure

```
.
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── eslint.config.js     # ESLint configuration
├── index.html           # Entry HTML file
├── package.json         # Project metadata and dependencies
├── README.md            # Project documentation
├── vite.config.js       # Vite configuration
├── public/              # Public assets
│   └── vite.svg
├── src/                 # Source code
│   ├── App.css          # Global CSS
│   ├── App.jsx          # Main App component
│   ├── index.css        # TailwindCSS configuration
│   ├── main.jsx         # Application entry point
│   ├── assets/          # Static assets
│   │   └── react.svg
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── OpenRoute.jsx
│   │   └── PrivateRoute.jsx
│   ├── pages/           # Application pages
│   │   ├── Addtransaction.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditTransaction.jsx
│   │   ├── Home.jsx
│   │   ├── UserLogin.jsx
│   │   └── UserSignup.jsx
│   ├── reducer/         # Redux root reducer
│   │   └── index.jsx
│   ├── slices/          # Redux slices
│   │   ├── authSlice.jsx
│   │   └── transactionSlice.jsx
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`.

---

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code issues.
- `npm run preview`: Preview the production build.

---

## Environment Variables

The project uses the following environment variables, defined in the `.env` file:

- `VITE_BASE_URL`: The base URL of the backend API.

Example `.env` file:

```
VITE_BASE_URL=https://expense-backend-ztia.onrender.com/api/v1 
              or
VITE_BASE_URL=http://localhost:3000/api/v1
```
---

## Dependencies

### Main Dependencies

- **React**: Frontend library for building user interfaces.
- **Redux Toolkit**: State management library.
- **React Router DOM**: Routing library for React.
- **Axios**: HTTP client for API requests.
- **TailwindCSS**: Utility-first CSS framework.
- **React Hot Toast**: Toast notifications.

### Dev Dependencies

- **Vite**: Build tool for modern web projects.
- **ESLint**: Linter for JavaScript and JSX.
- **eslint-plugin-react-hooks**: ESLint rules for React hooks.
- **eslint-plugin-react-refresh**: ESLint rules for React Fast Refresh.

---

## Development

### Key Files

- **`src/main.jsx`**: Application entry point. Configures Redux, React Router, and renders the app.
- **`src/App.jsx`**: Main application component. Defines routes for the app.
- **`src/reducer/index.jsx`**: Combines Redux slices into a root reducer.
- **`src/slices/authSlice.jsx`**: Manages authentication state.
- **`src/slices/transactionSlice.jsx`**: Manages transaction-related state.

### Key Components

- **Navbar**: Navigation bar with links to add transactions and logout.
- **PrivateRoute**: Protects routes that require authentication.
- **OpenRoute**: Redirects authenticated users away from public routes.

### Pages

- **Home**: Landing page with a call-to-action to sign up.
- **UserSignup**: User registration form.
- **UserLogin**: User login form.
- **Dashboard**: Displays transaction summary and list of transactions.
- **AddTransaction**: Form to add a new transaction.
- **EditTransaction**: Form to edit an existing transaction.

---

## License

This project is licensed under the MIT License.
