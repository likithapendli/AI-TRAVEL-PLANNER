# 📖 Complete Project Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Frontend Documentation](#frontend-documentation)
3. [Backend Documentation](#backend-documentation)
4. [Database Design](#database-design)
5. [API Flow Diagrams](#api-flow-diagrams)
6. [Code Walkthroughs](#code-walkthroughs)

---

## Architecture Overview

### System Architecture Diagram

```
                    ┌─────────────────────────┐
                    │    User Browser         │
                    ├─────────────────────────┤
                    │   Frontend Application  │
                    │  (HTML + CSS + JS)      │
                    └────────────┬────────────┘
                                 │
                    HTTP/HTTPS (Fetch API)
                                 │
                    ┌────────────▼────────────┐
                    │  Express.js Server      │
                    │  (Backend API)          │
                    ├────────────┬────────────┤
                    │ Routes     │ Middleware │
                    │ • Auth     │ • JWT      │
                    │ • Trips    │ • CORS     │
                    │ • Bookings │            │
                    │ • Expenses │            │
                    └────────────┬────────────┘
                                 │
                                 │
                    ┌────────────▼────────────┐
                    │   MongoDB Database      │
                    │  (Data Storage)         │
                    ├────────────────────────┤
                    │ Collections:            │
                    │ • Users                 │
                    │ • Trips                 │
                    │ • Bookings              │
                    │ • Expenses              │
                    └────────────────────────┘
```

### Technology Stack

```
Frontend Layer:
├── HTML5
├── CSS3 (Glassmorphism, Animations)
├── Vanilla JavaScript (ES6+)
├── Google Maps API
└── Local Storage

Backend Layer:
├── Node.js Runtime
├── Express.js Framework
├── Mongoose ODM
├── bcryptjs (Password hashing)
├── jsonwebtoken (JWT Auth)
└── CORS Middleware

Database Layer:
└── MongoDB (NoSQL Database)
```

---

## Frontend Documentation

### Pages Overview

#### 1. Register Page
- **URL**: Initial page on load
- **Features**:
  - User registration form
  - Input validation
  - Two-way form transitions
  - Link to login page
- **API Call**: `POST /api/auth/register`
- **Success Action**: Redirect to login page

#### 2. Login Page
- **URL**: Accessible from register page
- **Features**:
  - User login form
  - Email and password fields
  - Token storage in localStorage
  - Redirect to dashboard
- **API Call**: `POST /api/auth/login`
- **Success Action**: Store token, redirect to dashboard

#### 3. Dashboard Page
- **URL**: Main page after login
- **Features**:
  - Welcome card
  - Trip creation form
  - Quick statistics cards
  - Navigation bar with logout
- **API Call**: `POST /api/trips/generate-plan`
- **Success Action**: Redirect to travel plan page

#### 4. Travel Plan Page
- **URL**: After plan generation
- **Features**:
  - Day-wise itinerary cards
  - Budget breakdown
  - Google Maps integration
  - Place selection cards
  - Booking confirmation
- **API Calls**:
  - `POST /api/bookings/confirm`
  - Google Maps API

#### 5. Expense Tracker Page
- **URL**: From navbar
- **Features**:
  - Expense form
  - Expense list
  - Budget progress bar
  - Category filtering
- **API Calls**:
  - `POST /api/expenses/add`
  - `GET /api/expenses/list`
  - `DELETE /api/expenses/delete/:id`

### Frontend File Structure

#### index.html Structure
```html
├── registerPage
│   └── Auth Card with Form
├── loginPage
│   └── Auth Card with Form
├── dashboardPage
│   ├── Navbar
│   ├── Welcome Card
│   ├── Input Cards (Trip Form)
│   └── Stat Cards
├── travelPlanPage
│   ├── Navbar
│   ├── Plan Header
│   ├── Budget Section
│   ├── Map Section
│   ├── Itinerary Section
│   └── Booking Section
└── expenseTrackerPage
    ├── Navbar
    ├── Expense Form
    ├── Budget Progress
    └── Expenses List
```

#### style.css Design System
```css
Color Palette:
├── Primary Gradient: #667eea → #764ba2 (Purple-Pink)
├── Secondary Gradient: #f093fb → #f5576c (Pink-Red)
├── Success Gradient: #4facfe → #00f2fe (Blue-Cyan)
└── Glass Background: rgba(255, 255, 255, 0.1)

Typography:
├── Font Family: 'Poppins' (Regular)
├── Display Font: 'Playfair Display' (Headers)
├── Font Sizes: 0.85rem to 3rem
└── Font Weights: 300-700

Spacing:
├── Small: 0.5rem
├── Medium: 1rem
├── Large: 2rem
└── XL: 3rem

Effects:
├── Drop Shadow: box-shadow: var(--shadow-md)
├── Blur Effect: backdrop-filter: blur(10px)
├── Border Radius: 10-20px (rounded corners)
└── Transitions: 0.3s ease (smooth animations)
```

#### script.js Function Map
```javascript
Global Setup:
├── API_URL configuration
├── Local Storage management
└── Token handling

Page Navigation:
├── switchPage(pageName) - Switch between pages
└── Page-specific loaders

Authentication:
├── registerForm submission
├── loginForm submission
├── logout()
└── Auto-login on page load

Dashboard:
├── tripDetailsForm submission
└── loadDashboardStats()

Travel Plan:
├── displayTravelPlan()
├── displayItinerary()
├── displayPlacesForBooking()
├── confirmBooking()
└── initializeMap()

Expense Tracker:
├── expenseForm submission
├── loadExpenses()
├── displayExpenses()
├── deleteExpense()
└── updateBudgetProgress()

Utilities:
├── formatDate()
├── getCategoryIcon()
├── getCategoryColor()
└── Error logging
```

---

## Backend Documentation

### Server Setup (server.js)

```javascript
Initialization:
1. Load environment variables
2. Initialize Express app
3. Configure CORS middleware
4. Connect to MongoDB
5. Register route handlers
6. Start listening on port

Port: 5000 (configurable via .env)
CORS Origins: localhost:3000, localhost:5000
```

### Routes Structure

#### Authentication Routes (routes/auth.js)

```
POST /api/auth/register
├── Validate input (name, email, password)
├── Check if user exists
├── Hash password with bcrypt
├── Create user document
├── Generate JWT token
└── Return token and user data

POST /api/auth/login
├── Validate email and password
├── Find user by email
├── Compare password with hash
├── Generate JWT token
└── Return token and user data

GET /api/auth/me
├── Verify JWT token (middleware)
├── Fetch user by ID
└── Return user information
```

#### Trip Routes (routes/trips.js)

```
POST /api/trips/generate-plan
├── Validate input (destination, budget, days)
├── Calculate budget allocation
├── Generate day-wise itinerary
├── Generate place recommendations
├── Create trip document
└── Return trip data

GET /api/trips/my-trips
├── Verify JWT token
├── Fetch all trips for user
└── Sort by creation date

GET /api/trips/:id
├── Verify JWT token
├── Check user ownership
├── Fetch specific trip
└── Return trip data

PUT /api/trips/:id
├── Verify JWT token
├── Check user ownership
├── Update trip document
└── Return updated trip

DELETE /api/trips/:id
├── Verify JWT token
├── Check user ownership
├── Delete trip document
└── Return success message
```

#### Booking Routes (routes/bookings.js)

```
POST /api/bookings/confirm
├── Validate input (tripId, places)
├── Verify trip ownership
├── Calculate total cost
├── Create booking document
├── Update trip status
└── Return booking data

GET /api/bookings/my-bookings
├── Verify JWT token
├── Fetch all bookings for user
└── Populate trip details

GET /api/bookings/:id
├── Verify JWT token
├── Check user ownership
├── Fetch booking with trip details
└── Return booking data

PUT /api/bookings/:id/status
├── Verify JWT token
├── Check user ownership
├── Update status (pending/confirmed/cancelled)
└── Return updated booking

DELETE /api/bookings/:id
├── Verify JWT token
├── Check user ownership
├── Cancel booking
└── Return success message
```

#### Expense Routes (routes/expenses.js)

```
POST /api/expenses/add
├── Validate input (amount, category, description)
├── Create expense document
└── Return expense data

GET /api/expenses/list
├── Verify JWT token
├── Fetch all expenses
├── Calculate statistics
└── Return expenses with summary

GET /api/expenses/trip/:tripId
├── Verify JWT token
├── Fetch trip-specific expenses
├── Calculate trip total
└── Return expenses

PUT /api/expenses/:id
├── Verify JWT token
├── Check user ownership
├── Update expense
└── Return updated expense

DELETE /api/expenses/delete/:id
├── Verify JWT token
├── Check user ownership
├── Delete expense
└── Return success message
```

### Models Overview

#### User Model
```javascript
Schema:
├── name: String (required, max 50)
├── email: String (required, unique, validated)
├── password: String (required, min 6, hashed)
├── createdAt: Date (default: now)

Methods:
├── matchPassword() - Compare entered password with hash
└── Pre-save hook - Hash password before saving

Security:
├── Password hashing with bcryptjs
├── Password field hidden by default (select: false)
└── Email uniqueness enforced
```

#### Trip Model
```javascript
Schema:
├── userId: ObjectId (ref: User)
├── destination: String (required)
├── budget: Number (required, min 100)
├── days: Number (required, 1-365)
├── itinerary: Array of objects
│   ├── day: Number
│   ├── title: String
│   ├── morning/afternoon/evening: String
│   ├── activities: Array
│   └── budget: Number
├── costs: Object
│   ├── hotel: Number
│   ├── food: Number
│   ├── transport: Number
│   └── activities: Number
├── places: Array of objects
│   ├── name: String
│   ├── description: String
│   ├── cost: Number
│   └── icon: String
├── status: String (planning/booked/ongoing/completed)
├── startDate: Date
├── endDate: Date
└── createdAt: Date

Validation:
├── Destination required
├── Budget minimum $100
├── Days between 1 and 365
```

#### Booking Model
```javascript
Schema:
├── userId: ObjectId (ref: User)
├── tripId: ObjectId (ref: Trip)
├── places: Array of objects
│   ├── name: String
│   ├── cost: Number
│   └── bookingDate: Date
├── totalCost: Number
├── status: String (pending/confirmed/cancelled)
├── paymentStatus: String (unpaid/paid/refunded)
├── createdAt: Date
├── confirmedAt: Date
└── notes: String

Relationships:
├── Links to User (one-to-many)
└── Links to Trip (one-to-many)
```

#### Expense Model
```javascript
Schema:
├── userId: ObjectId (ref: User)
├── tripId: ObjectId (ref: Trip, optional)
├── amount: Number (required, min 0)
├── category: String (Food/Hotel/Transport/Activities/Shopping/Other)
├── description: String (required)
├── date: Date (default: now)
└── createdAt: Date

Categories Enum:
├── Food
├── Hotel
├── Transport
├── Activities
├── Shopping
└── Other

Validation:
├── Amount must be >= 0
├── Category must be from enum
├── Description required
```

### Middleware

#### Authentication Middleware (middleware/auth.js)

```javascript
Function: protect

Process:
1. Extract token from Authorization header
2. Verify token using JWT secret
3. Decode token to get user ID
4. Attach user object to request
5. Call next middleware/route handler

Error Handling:
├── 401 if token missing
├── 401 if token invalid
└── 401 if token expired
```

---

## Database Design

### Collections Relationship Diagram

```
Users Collection
    │
    ├─→ Trips Collection
    │   ├─→ Bookings Collection
    │   └─→ Expenses Collection
    │
    ├─→ Bookings Collection
    │
    └─→ Expenses Collection
```

### Sample Data Relationships

```
User: { id: 1, name: 'John', email: 'john@example.com' }
    ├── Trip: { id: 101, userId: 1, destination: 'Paris' }
    │   ├── Booking: { tripId: 101, places: [...] }
    │   └── Expense: { tripId: 101, amount: 50 }
    │
    ├── Trip: { id: 102, userId: 1, destination: 'London' }
    │   └── Expense: { tripId: 102, amount: 75 }
    │
    └── Expense: { userId: 1, tripId: null, amount: 100 }
```

### Indexes for Performance

```javascript
Recommended Indexes:
├── Users
│   └── email (unique)
│
├── Trips
│   ├── userId
│   └── createdAt (for sorting)
│
├── Bookings
│   ├── userId
│   ├── tripId
│   └── createdAt
│
└── Expenses
    ├── userId
    ├── tripId
    ├── category
    └── date
```

---

## API Flow Diagrams

### User Registration Flow

```
Browser                          Server                      Database
   │                               │                           │
   ├─ POST /register ────────────→ │                           │
   │   {name, email, pwd}         │                           │
   │                               ├─ Validate input ─────────→│
   │                               │                           │
   │                               │← User exists? ────────────┤
   │                               │                           │
   │                  (If Valid)   └─ Hash password           │
   │                               ├─ Create user ───────────→│
   │                               │                           │
   │← 201 + token ────────────────┤← User created ───────────┤
   │  {token, user}              │                           │
   │                               │                           │
```

### Travel Plan Generation Flow

```
Browser                          Server                      Database
   │                               │                           │
   ├─ POST /generate-plan ────────→│                           │
   │   {destination, budget, days} │                           │
   │                               ├─ Verify token ───────────→│
   │                               │                           │
   │                               ├─ Validate input          │
   │                               │                           │
   │                               ├─ Calculate budget ────┐   │
   │                               │   allocation        │   │
   │                               │                     │   │
   │                               ├─ Generate itinerary ─┤   │
   │                               │                     │   │
   │                               ├─ Generate places ───┤   │
   │                               │                     │   │
   │                               ├─ Create trip ─────────→│
   │                               │                           │
   │← 201 + plan ──────────────────┤← Trip created ─────────┤
   │  {trip, itinerary, places}   │                           │
   │                               │                           │
```

### Expense Tracking Flow

```
Browser                          Server                      Database
   │                               │                           │
   ├─ POST /expenses/add ─────────→│                           │
   │   {amount, category, desc}    │                           │
   │                               ├─ Verify token ───────────→│
   │                               │                           │
   │                               ├─ Validate input          │
   │                               ├─ Create expense ────────→│
   │                               │                           │
   │← 201 + expense ───────────────┤← Expense created ──────┤
   │                               │                           │
   │                               │                           │
   ├─ GET /expenses/list ─────────→│                           │
   │                               ├─ Verify token ───────────→│
   │                               │                           │
   │                               ├─ Fetch expenses ────────→│
   │                               │   (filter by userId)      │
   │                               │                           │
   │← 200 + expenses ──────────────┤← Expenses fetched ─────┤
   │  [exp1, exp2, ...]           │   Calculate stats        │
   │                               │                           │
```

---

## Code Walkthroughs

### Frontend Authentication Flow

1. **User Registration**
   ```javascript
   User fills register form
   ↓
   JavaScript validates input
   ↓
   Fetch POST /api/auth/register
   ↓
   If successful: Store token, redirect to login
   If error: Show error message
   ```

2. **User Login**
   ```javascript
   User fills login form
   ↓
   Fetch POST /api/auth/login
   ↓
   Save token to localStorage
   ↓
   Save user object to localStorage
   ↓
   Redirect to dashboard
   ↓
   Load dashboard statistics
   ```

3. **Auto-Login on Page Load**
   ```javascript
   Check localStorage for token and user
   ↓
   If both exist:
     Set currentUser variable
     Redirect to dashboardPage
   Else:
     Redirect to registerPage
   ```

### Backend Trip Generation

1. **Generate Plan Algorithm**
   ```javascript
   Receive: destination, budget, days
   
   ├─ Calculate daily budget = budget / days
   │
   ├─ Allocate costs:
   │  ├─ Hotel: 40% of budget
   │  ├─ Food: 30% of budget
   │  ├─ Transport: 15% of budget
   │  └─ Activities: 15% of budget
   │
   ├─ Generate itinerary:
   │  ├─ For each day (1 to days):
   │  │  ├─ Create activity title
   │  │  ├─ Suggest morning activity
   │  │  ├─ Suggest afternoon activity
   │  │  ├─ Suggest evening activity
   │  │  └─ Assign daily budget
   │  └─ Store in array
   │
   ├─ Generate places:
   │  ├─ Get destination-specific places
   │  ├─ Estimate costs for each place
   │  ├─ Add icons and descriptions
   │  └─ Store in array
   │
   └─ Save trip to database
   ```

### Budget Calculation Logic

```javascript
Total Budget: $3000
Days: 7

Cost Allocation:
├─ Hotel (40%): $3000 × 0.40 = $1200
├─ Food (30%): $3000 × 0.30 = $900
├─ Transport (15%): $3000 × 0.15 = $450
└─ Activities (15%): $3000 × 0.15 = $450
                                   ─────
                                   $3000 ✓

Daily Average: $3000 ÷ 7 = ~$428.57 per day
```

---

## Development Best Practices

### Frontend Best Practices
- Keep HTML structure clean and semantic
- Use CSS classes instead of inline styles
- Separate concerns: HTML structure, CSS styling, JS logic
- Use meaningful variable names
- Comment complex logic
- Validate user input before sending to API
- Handle API errors gracefully
- Store sensitive data (tokens) securely

### Backend Best Practices
- Use environment variables for configuration
- Validate all user inputs
- Hash passwords before storing
- Use prepared statements (Mongoose handles this)
- Return appropriate HTTP status codes
- Log errors for debugging
- Implement proper error handling
- Use middleware for cross-cutting concerns
- Keep route handlers lean and focused
- Use consistent naming conventions

### Database Best Practices
- Create indexes on frequently queried fields
- Use validation at schema level
- Implement soft deletes for important data
- Use transactions for related operations
- Monitor query performance
- Regular backups
- Use connection pooling

---

## Performance Optimization Tips

1. **Frontend**
   - Lazy load images
   - Minify CSS and JavaScript
   - Cache API responses
   - Use debouncing for form inputs
   - Optimize bundle size

2. **Backend**
   - Use database indexes
   - Implement caching (Redis)
   - Use pagination for large datasets
   - Optimize MongoDB queries
   - Use compression middleware

3. **Database**
   - Index frequently searched fields
   - Use lean queries when projecting
   - Batch write operations
   - Archive old data
   - Monitor slow queries

---

This documentation should help you understand the complete architecture, how components interact, and the flow of data through the application.
