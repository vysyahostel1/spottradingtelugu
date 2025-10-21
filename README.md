# SPOT TRADING PLATFORM

A comprehensive trading education platform with modern React frontend and Node.js/Express backend, featuring MongoDB database and JWT authentication.

## Features

- **Full-Stack Application**: React frontend with Node.js/Express backend
- **Database Integration**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication with role-based access
- **Admin Panel**: Complete user and content management
- **Course Management**: Create, update, and manage trading courses
- **Enrollment System**: Course registration and progress tracking
- **Review System**: Customer testimonials with admin approval
- **Contact Management**: Handle user inquiries and support
- **Premium UI**: Dark theme with gold accents using Tailwind CSS
- **Responsive Design**: Optimized for all devices
- **Real-time Updates**: Live data synchronization

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **Chart.js** - Data visualization
- **Stripe** - Payment processing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spot-trading-platform
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**

   Create `.env` file in backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/spot-trading
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

5. **Database Setup**

   Start MongoDB service, then seed the database:
   ```bash
   cd backend
   npm run seed
   cd ..
   ```

6. **Start the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

   The application will be available at:
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:5000

## Project Structure

```
spot-trading-platform/
├── backend/                    # Backend API
│   ├── models/                # MongoDB schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Review.js
│   │   ├── Contact.js
│   │   └── Settings.js
│   ├── routes/                # API endpoints
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── courses.js
│   │   ├── enrollments.js
│   │   ├── reviews.js
│   │   ├── contacts.js
│   │   └── settings.js
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── server.js              # Main server file
│   ├── seed.js                # Database seeding
│   ├── package.json
│   └── README.md
├── src/
│   ├── components/            # Reusable UI components
│   ├── context/              # React context providers
│   │   ├── AuthContext.jsx
│   │   ├── UserContext.jsx
│   │   ├── CoursesContext.jsx
│   │   ├── EnrollmentContext.jsx
│   │   ├── ReviewsContext.jsx
│   │   ├── ContactContext.jsx
│   │   └── SettingsContext.jsx
│   ├── pages/                # Page components
│   ├── services/
│   │   └── api.js            # API service layer
│   ├── index.css             # Global styles
│   └── index.jsx             # App entry point
├── public/                   # Static assets
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile

### User Management (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/recent` - Get recent registrations
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user

### Course Management
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Enrollment System
- `GET /api/enrollments/my` - Get user's enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments` - Get all enrollments (Admin)
- `PUT /api/enrollments/:id/status` - Update enrollment status

### Review System
- `GET /api/reviews` - Get approved reviews
- `POST /api/reviews` - Submit review
- `GET /api/reviews/admin/all` - Get all reviews (Admin)
- `PUT /api/reviews/:id/approve` - Approve review (Admin)
- `DELETE /api/reviews/:id` - Delete review (Admin)

### Contact Management
- `POST /api/contacts` - Send contact message
- `GET /api/contacts` - Get all messages (Admin)
- `PUT /api/contacts/:id/read` - Mark message as read
- `PUT /api/contacts/:id/replied` - Mark message as replied
- `DELETE /api/contacts/:id` - Delete message (Admin)

### Settings (Admin)
- `GET /api/settings` - Get application settings
- `PUT /api/settings` - Update settings

## Default Credentials

After running the seed script, use these credentials:

**Admin Account:**
- Email: `admin@spottrading.com`
- Password: `password`

## Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon (development)
npm run start    # Start production server
npm run seed     # Seed database with sample data
```

## Development Guidelines

### Code Style
- Use ESLint and Prettier for code formatting
- Follow React best practices and hooks patterns
- Use meaningful component and variable names
- Add PropTypes for component props

### API Design
- RESTful API endpoints
- Consistent error response format
- JWT authentication for protected routes
- Input validation using express-validator

### Database
- Use Mongoose for schema definition
- Implement proper indexing for performance
- Handle database errors gracefully
- Use transactions for complex operations

## Deployment

### Environment Variables for Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spot-trading
JWT_SECRET=your-production-jwt-secret-key
PORT=5000
NODE_ENV=production
```

### Build Commands
```bash
# Frontend
npm run build

# Backend
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue on GitHub or contact the development team.
