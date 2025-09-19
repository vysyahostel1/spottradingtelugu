# Spot Trading Landing Page

This is a React-based landing page and user management system for a spot trading education platform. It includes user authentication, multi-page navigation, and course management features.

## Features

- Multi-page navigation using React Router
- User authentication with admin and customer roles
- User registration with email uniqueness and password validation
- Responsive design with Tailwind CSS
- Integration with Stripe for payments (dependencies included)
- Chart.js for displaying statistics and analytics

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000` (or the port Vite uses)

## Usage

- Use the Signup page to create a new customer account.
- Use the Login page to log in as a customer or admin.
  - Admin credentials:
    - Email: `admin@example.com`
    - Password: `admin123`
- After login, customers are redirected to the home page.
- Admins are redirected to the admin dashboard.

## Project Structure

- `src/pages/` - React page components for different routes
- `src/components/` - Reusable UI components
- `src/context/` - React context providers for auth, user, courses, etc.
- `src/index.jsx` - Application entry point with routing setup

## Dependencies

- React 18
- React Router DOM
- Tailwind CSS
- Vite
- Stripe React SDK
- Chart.js and React Chart.js 2
- Framer Motion
- Lucide React icons

## Notes

- User data and authentication state are stored in localStorage for simplicity.
- Passwords are stored in plain text in localStorage (not secure for production).
- This project is intended for educational/demo purposes.

## License

MIT License
