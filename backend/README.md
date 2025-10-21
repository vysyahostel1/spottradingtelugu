# Spot Trading Backend

Backend API for the Spot Trading platform built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization (JWT)
- User management
- Course management
- Enrollment system
- Review system
- Contact messages
- Settings management

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in `.env` if needed

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update current user

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/recent` - Get recent users
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Enrollments
- `GET /api/enrollments/my` - Get user's enrollments
- `POST /api/enrollments` - Create enrollment
- `GET /api/enrollments` - Get all enrollments (Admin)
- `PUT /api/enrollments/:id/status` - Update enrollment status (Admin)

### Reviews
- `GET /api/reviews` - Get approved reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id/approve` - Approve review (Admin)
- `DELETE /api/reviews/:id` - Delete review (Admin)

### Contacts
- `POST /api/contacts` - Send contact message
- `GET /api/contacts` - Get all messages (Admin)
- `PUT /api/contacts/:id/read` - Mark as read (Admin)
- `DELETE /api/contacts/:id` - Delete message (Admin)

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings (Admin)

## Environment Variables

Create a `.env` file in the backend directory:

```
MONGODB_URI=mongodb://localhost:27017/spot-trading
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
