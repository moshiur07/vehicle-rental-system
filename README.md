# 🚗 Vehicle Rental System API

A robust and secure backend API for managing vehicle rentals, built with Node.js, TypeScript, and PostgreSQL. This system provides comprehensive functionality for vehicle inventory management, customer operations, and booking workflows with role-based access control.

**Live API:** [https://vehicle-rental-system-chi-gray.vercel.app/](https://vehicle-rental-system-chi-gray.vercel.app/)

---

## ✨ Features

### Core Functionality
- **Vehicle Management** - Complete CRUD operations for vehicle inventory with real-time availability tracking
- **Customer Management** - User registration, profile management, and account operations
- **Booking System** - Handle rental bookings, returns, and automated cost calculations
- **Authentication & Authorization** - Secure JWT-based authentication with role-based access control
- **Admin Dashboard** - Full administrative access to manage all system resources

### Security Features
- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (RBAC)
- Protected API endpoints
- Input validation and sanitization

---

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL

### Security & Authentication
- **bcrypt** - Password hashing and validation
- **jsonwebtoken (JWT)** - Token generation and verification

### Deployment
- **Platform:** Vercel

---

## 👥 User Roles

### Admin
- Full system access and privileges
- Manage vehicle inventory (add, update, delete vehicles)
- View and manage all customer accounts
- Access and modify all bookings across the system
- System configuration and settings

### Customer
- Self-registration and profile management
- Browse available vehicles
- Create and manage personal bookings
- View booking history
- Update personal information

---

## 🔐 Authentication Flow

The API implements a secure authentication system using JWT tokens:

1. **Registration/Login**
   - User passwords are hashed using bcrypt before storage
   - Login via `/api/v1/auth/signin` endpoint
   - Upon successful authentication, server issues a JWT token

2. **Token Usage**
   - Include token in request headers: `Authorization: Bearer <your-token>`
   - Token contains user role and permissions

3. **Authorization**
   - Protected endpoints validate the JWT token
   - Server checks user permissions based on role
   - Returns `401 Unauthorized` for invalid/missing tokens
   - Returns `403 Forbidden` for insufficient permissions

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd vehicle-rental-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental_db

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d

   # Bcrypt Configuration
   BCRYPT_SALT_ROUNDS=10
   ```

4. **Database Setup**
   ```bash
   # Create the database
   createdb vehicle_rental_db

   # Run migrations
   npm run migrate

   # (Optional) Seed initial data
   npm run seed
   ```

5. **Build TypeScript**
   ```bash
   npm run build
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

---

## 📖 Usage Guide

### Authentication

#### Register a new customer
```bash
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890"
}
```

#### Sign in
```bash
POST /api/v1/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Vehicle Operations

#### Get all available vehicles
```bash
GET /api/v1/vehicles?available=true
Authorization: Bearer <your-token>
```

#### Get vehicle by ID
```bash
GET /api/v1/vehicles/:id
Authorization: Bearer <your-token>
```

#### Create a vehicle (Admin only)
```bash
POST /api/v1/vehicles
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "brand": "Toyota",
  "model": "Camry",
  "year": 2024,
  "pricePerDay": 50.00,
  "available": true,
  "licensePlate": "ABC-1234"
}
```

### Booking Operations

#### Create a booking
```bash
POST /api/v1/bookings
Authorization: Bearer <customer-token>
Content-Type: application/json

{
  "vehicleId": 1,
  "startDate": "2024-12-15",
  "endDate": "2024-12-20"
}
```

#### Get user's bookings
```bash
GET /api/v1/bookings/my-bookings
Authorization: Bearer <customer-token>
```

#### Return a vehicle (Admin only)
```bash
PATCH /api/v1/bookings/:id/return
Authorization: Bearer <admin-token>
```

---

## 📁 Project Structure

```
vehicle-rental-system/
├── src/
│   ├── config/          # Configuration files
│   ├── middlewares/     # Custom middlewares
│   ├── modules/         # API routes, Business logic
│   ├── types/           # express
│   └── app.ts           # Express app setup
├── .env                 # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json        # TypeScript configuration
└── README.md
```

---

## 🔒 Security Best Practices

- All passwords are hashed using bcrypt with configurable salt rounds
- JWT tokens expire after a configurable period (default: 7 days)
- Sensitive routes are protected with authentication middleware
- Role-based access control prevents unauthorized operations
- Environment variables store sensitive configuration
- Input validation on all API endpoints

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📧 Contact & Support

For questions, issues, or support:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ using Node.js, TypeScript, and PostgreSQL**
