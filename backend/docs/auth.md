# Authentication System Documentation

## Current Implementation Status

### 1. Database Schema
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

enum Role {
  USER
  ADMIN
}
```

### 2. Implemented Endpoints

#### POST /api/auth/signup
- **Purpose**: Register a new user
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string (optional)"
  }
  ```
- **Response Status Codes**:
  - `200`: User created successfully
  - `411`: Validation error (see validation rules below)
  - `403`: User already exists
  - `500`: Server error

- **Response Format**:
  ```json
  // Success (200)
  {
    "message": "User created successfully",
    "user": {
      "id": "uuid",
      "email": "string",
      "name": "string",
      "role": "USER",
      "createdAt": "datetime"
    }
  }

  // Error (411, 403, 500)
  {
    "message": "error message"
  }
  ```

### 3. Validation Rules

#### Signup Validation
1. **Required Fields**
   - Both email and password must be provided
   - Status: 411 if missing

2. **Email Validation**
   - Must be a valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
   - Status: 411 if invalid

3. **Password Validation**
   - Length: Between 8 and 20 characters
   - Must contain both lowercase and uppercase letters
   - Status: 411 if validation fails

### 4. Test Cases

#### Signup Endpoint Tests
1. **Successful Signup**
   - Test: Create user with valid data
   - Expected: Status 200, user created

2. **Duplicate Email**
   - Test: Try to create user with existing email
   - Expected: Status 403

3. **Invalid Email Format**
   - Test: Submit invalid email format
   - Expected: Status 411

4. **Password Length**
   - Test: Submit password < 8 or > 20 characters
   - Expected: Status 411

5. **Password Case**
   - Test: Submit password without uppercase/lowercase
   - Expected: Status 411

6. **Missing Required Fields**
   - Test: Submit without email or password
   - Expected: Status 411

### 5. Project Structure
```
backend/
├── src/
│   ├── controllers/
│   │   └── auth.controller.ts    # Authentication logic
│   ├── middleware/
│   │   └── validation.middleware.ts  # Input validation
│   ├── routes/
│   │   └── auth.routes.ts        # Route definitions
│   ├── __tests__/
│   │   └── auth.test.ts          # Test cases
│   └── server.ts                 # Express app setup
├── prisma/
│   └── schema.prisma            # Database schema
└── docs/
    └── auth.md                  # This documentation
```

### 6. Security Features
1. **Password Security**
   - Passwords are hashed using bcrypt
   - Salt rounds: 10
   - Password never returned in responses

2. **Database Security**
   - User table mapped to "users" (not exposed directly)
   - UUID used for user IDs
   - Email uniqueness enforced at database level

### 7. Pending Features
1. **Authentication**
   - Login endpoint
   - JWT token generation
   - Password reset functionality

2. **User Management**
   - Get user profile
   - Update user profile
   - Delete user account

3. **Session Management**
   - Logout functionality
   - Session tracking
   - Token refresh mechanism

### 8. Dependencies
- Express.js: Web framework
- Prisma: Database ORM
- bcryptjs: Password hashing
- Jest: Testing framework
- TypeScript: Language

### 9. Environment Variables Required
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

## Next Steps
1. Implement login endpoint with JWT
2. Add user profile management
3. Implement session management
4. Add password reset functionality
5. Add email verification 