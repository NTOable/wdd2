# Product API - User Stories

This document contains the user stories for the Product API project, organized by Epics.

---

## Epic: PRODUCT API

### User Story 1: Active Listing
**As a** customer,  
**I want** to view all active product listings,  
**So that** I can browse products that are currently available for purchase.

**Acceptance Criteria:**
- API endpoint returns only products with status = "active"
- Response includes product name, price, description, and image
- Pagination is supported for large datasets

---

### User Story 2: Featured Items
**As a** customer,  
**I want** to see featured/highlighted products,  
**So that** I can quickly discover special or promoted items.

**Acceptance Criteria:**
- API has an endpoint to fetch featured products
- Featured items are marked in the database
- Response includes same fields as regular product listings

---

### User Story 3: List Products Endpoint
**As a** developer,  
**I want** a list products API endpoint,  
**So that** I can integrate product data into the frontend application.

**Acceptance Criteria:**
- GET endpoint exists at `/api/products`
- Supports filtering by category, price range, and search term
- Returns JSON response with product array

---

## Epic: Authentication

### User Story: Authentication Layer
**As a** user,  
**I want** a secure authentication system,  
**So that** only authorized users can access protected resources.

**Acceptance Criteria:**
- User registration endpoint exists
- User login endpoint exists with JWT token generation
- Protected routes require valid authentication token
- Password is hashed before storage

---

## Prompt for Agent

Use these user stories to implement the following features:

1. **Product API Endpoints:**
   - Create a GET `/api/products` endpoint that lists all products
   - Implement filtering (category, price range, search)
   - Add pagination support

2. **Active Listing Feature:**
   - Add status field to product schema
   - Filter products where status = "active"

3. **Featured Items Feature:**
   - Add featured boolean field to product schema
   - Create GET `/api/products/featured` endpoint

4. **Authentication:**
   - Implement user registration (POST `/api/auth/register`)
   - Implement user login (POST `/api/auth/login`)
   - Generate JWT tokens on successful login
   - Create authentication middleware for protected routes
   - Hash passwords using bcrypt

**Tech Stack:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
