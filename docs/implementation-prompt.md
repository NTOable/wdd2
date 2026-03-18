# Implementation Prompt: Product API & Authentication

## Project Overview

Build a RESTful Product API with authentication using Node.js, Express, MongoDB/Mongoose, and JWT. This implementation addresses three main epics: Product API (Active Listing, Featured Items, List Products Endpoint) and Authentication.

---

## Prerequisites

- Node.js installed
- MongoDB installed locally or MongoDB Atlas connection string
- Environment variables configuration (`.env` file)

---

## Step 1: Project Setup

### 1.1 Initialize the Project

```bash
mkdir product-api
cd product-api
npm init -y
```

### 1.2 Install Dependencies

```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet morgan
npm install --save-dev nodemon
```

### 1.3 Create Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-api
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
```

---

## Step 2: Project Structure

Create the following folder structure:

```
product-api/
├── config/
│   └── db.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── productRoutes.js
├── controllers/
│   ├── authController.js
│   └── productController.js
├── .env
├── server.js
└── package.json
```

---

## Step 3: Database Connection

### 3.1 Create `config/db.js`

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## Step 4: Product Model

### 4.1 Create `models/Product.js`

**Acceptance Criteria from User Stories:**
- Product must have: name, price, description, image, status (active/inactive), featured (boolean)
- Status defaults to "active"
- Featured defaults to false
- Include timestamp fields

```javascript
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  image: {
    type: String,
    default: '/images/default-product.png'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: 'general'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
```

---

## Step 5: User Model

### 5.1 Create `models/User.js`

**Acceptance Criteria from User Stories:**
- User must have: name, email, password (hashed)
- Password must be hashed before storage
- Email must be unique

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  }
}, {
  timestamps: true
});

// Hash password before saving (User Story: Password is hashed before storage)
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
```

---

## Step 6: Authentication Middleware

### 6.1 Create `middleware/auth.js`

**Acceptance Criteria from User Stories:**
- Protected routes require valid authentication token

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

module.exports = { protect };
```

---

## Step 7: Product Controller

### 7.1 Create `controllers/productController.js`

**Acceptance Criteria from User Stories:**
- GET /api/products returns only products with status = "active"
- Response includes product name, price, description, and image
- Pagination is supported for large datasets
- Supports filtering by category, price range, and search term
- GET /api/products/featured returns featured products

```javascript
const Product = require('../models/Product');

// @desc    Get all products with filtering and pagination
// @route   GET /api/products
// @access  Public
// @acceptance-criteria:
//   - Returns only products with status = "active"
//   - Response includes product name, price, description, and image
//   - Pagination is supported
//   - Supports filtering by category, price range, and search term
exports.getProducts = async (req, res) => {
  try {
    // Build query string for filtering
    let query;
    const reqQuery = { ...req.query };
    
    // Remove special query params
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Default: Only show active products (User Story: Active Listing)
    reqQuery.status = 'active';

    // Handle category filter
    if (reqQuery.category) {
      reqQuery.category = reqQuery.category;
    }

    // Handle price range filter (min and max)
    if (reqQuery.minPrice || reqQuery.maxPrice) {
      reqQuery.price = {};
      if (reqQuery.minPrice) reqQuery.price.$gte = reqQuery.minPrice;
      if (reqQuery.maxPrice) reqQuery.price.$lte = reqQuery.maxPrice;
    }

    // Handle search term (search in name and description)
    let searchQuery = '';
    if (reqQuery.search) {
      searchQuery = reqQuery.search;
      delete reqQuery.search;
    }

    // Build final query
    let finalQuery = { ...reqQuery };
    
    // Add text search if search term exists
    if (searchQuery) {
      finalQuery.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ];
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments(finalQuery);

    const products = await Product.find(finalQuery)
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pagination,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
// @acceptance-criteria:
//   - API has an endpoint to fetch featured products
//   - Featured items are marked in the database
//   - Response includes same fields as regular product listings
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ 
      featured: true,
      status: 'active' 
    }).limit(10);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single product (optional - for future use)
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id,
      status: 'active'
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new product (protected route - for admin)
// @route   POST /api/products
// @access  Private
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
```

---

## Step 8: Auth Controller

### 8.1 Create `controllers/authController.js`

**Acceptance Criteria from User Stories:**
- User registration endpoint exists
- User login endpoint exists with JWT token generation
- Password is hashed before storage

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
// @acceptance-criteria:
//   - User registration endpoint exists
//   - Password is hashed before storage
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user (password will be hashed by pre-save middleware)
    const user = await User.create({
      name,
      email,
      password
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// @acceptance-criteria:
//   - User login endpoint exists with JWT token generation
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check for user (include password for comparison)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

---

## Step 9: Routes

### 9.1 Create `routes/productRoutes.js`

```javascript
const express = require('express');
const router = express.Router();

const {
  getProducts,
  getFeaturedProducts,
  getProduct,
  createProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/featured', getFeaturedProducts);
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes (for admin)
router.post('/', protect, createProduct);

module.exports = router;
```

### 9.2 Create `routes/authRoutes.js`

```javascript
const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
```

---

## Step 10: Main Server File

### 10.1 Create `server.js`

```javascript
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Security middleware
app.use(helmet());
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
```

---

## Step 11: Test the API

### 11.1 Start the Server

```bash
npm run dev
# or
npm start
```

### 11.2 Test Endpoints

#### Register a User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get All Products (with filtering & pagination)
```http
GET /api/products?page=1&limit=10&category=electronics&minPrice=10&maxPrice=100&search=laptop
```

#### Get Featured Products
```http
GET /api/products/featured
```

---

## Acceptance Criteria Summary

### Product API
- [x] GET `/api/products` returns only products with status = "active"
- [x] Response includes product name, price, description, and image
- [x] Pagination is supported for large datasets
- [x] Supports filtering by category, price range, and search term
- [x] GET `/api/products/featured` endpoint exists and returns featured items

### Authentication
- [x] POST `/api/auth/register` endpoint exists
- [x] POST `/api/auth/login` endpoint exists with JWT token generation
- [x] Protected routes require valid authentication token
- [x] Password is hashed before storage

---

## API Documentation Summary

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/products | Get all products with filtering & pagination | Public |
| GET | /api/products/featured | Get featured products | Public |
| GET | /api/products/:id | Get single product | Public |
| POST | /api/products | Create product | Private |
| POST | /api/auth/register | Register new user | Public |
| POST | /api/auth/login | Login user | Public |
| GET | /api/auth/me | Get current user | Private |
