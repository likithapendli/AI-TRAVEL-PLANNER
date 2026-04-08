// ==================== API TESTING GUIDE ====================

/**
 * This file contains example API calls for testing the AI Travel Planner application
 * You can copy these and test them in Postman or use curl commands
 */

// ==================== BASE URL ====================
const BASE_URL = 'http://localhost:5000/api';

// ==================== AUTHENTICATION ====================

/**
 * 1. REGISTER A NEW USER
 * POST /api/auth/register
 */
const registerUser = {
    method: 'POST',
    url: `${BASE_URL}/auth/register`,
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
    }
};

/**
 * 2. LOGIN USER
 * POST /api/auth/login
 */
const loginUser = {
    method: 'POST',
    url: `${BASE_URL}/auth/login`,
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        email: 'john@example.com',
        password: 'password123'
    }
};

/**
 * 3. GET CURRENT USER
 * GET /api/auth/me
 */
const getCurrentUser = {
    method: 'GET',
    url: `${BASE_URL}/auth/me`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

// ==================== TRIPS ====================

/**
 * 4. GENERATE TRAVEL PLAN
 * POST /api/trips/generate-plan
 */
const generateTravelPlan = {
    method: 'POST',
    url: `${BASE_URL}/trips/generate-plan`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    },
    body: {
        destination: 'Paris',
        budget: 3000,
        days: 7
    }
};

/**
 * 5. GET MY TRIPS
 * GET /api/trips/my-trips
 */
const getMyTrips = {
    method: 'GET',
    url: `${BASE_URL}/trips/my-trips`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

/**
 * 6. GET TRIP BY ID
 * GET /api/trips/:id
 */
const getTripById = {
    method: 'GET',
    url: `${BASE_URL}/trips/TRIP_ID_HERE`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

/**
 * 7. UPDATE TRIP
 * PUT /api/trips/:id
 */
const updateTrip = {
    method: 'PUT',
    url: `${BASE_URL}/trips/TRIP_ID_HERE`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    },
    body: {
        status: 'booked'
    }
};

/**
 * 8. DELETE TRIP
 * DELETE /api/trips/:id
 */
const deleteTrip = {
    method: 'DELETE',
    url: `${BASE_URL}/trips/TRIP_ID_HERE`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

// ==================== BOOKINGS ====================

/**
 * 9. CONFIRM BOOKING
 * POST /api/bookings/confirm
 */
const confirmBooking = {
    method: 'POST',
    url: `${BASE_URL}/bookings/confirm`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    },
    body: {
        tripId: 'TRIP_ID_HERE',
        places: [
            { name: 'Eiffel Tower' },
            { name: 'Louvre Museum' }
        ]
    }
};

/**
 * 10. GET MY BOOKINGS
 * GET /api/bookings/my-bookings
 */
const getMyBookings = {
    method: 'GET',
    url: `${BASE_URL}/bookings/my-bookings`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

/**
 * 11. GET BOOKING BY ID
 * GET /api/bookings/:id
 */
const getBookingById = {
    method: 'GET',
    url: `${BASE_URL}/bookings/BOOKING_ID_HERE`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

/**
 * 12. UPDATE BOOKING STATUS
 * PUT /api/bookings/:id/status
 */
const updateBookingStatus = {
    method: 'PUT',
    url: `${BASE_URL}/bookings/BOOKING_ID_HERE/status`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    },
    body: {
        status: 'confirmed'  // pending, confirmed, cancelled
    }
};

/**
 * 13. CANCEL BOOKING
 * DELETE /api/bookings/:id
 */
const cancelBooking = {
    method: 'DELETE',
    url: `${BASE_URL}/bookings/BOOKING_ID_HERE`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

// ==================== EXPENSES ====================

/**
 * 14. ADD EXPENSE
 * POST /api/expenses/add
 */
const addExpense = {
    method: 'POST',
    url: `${BASE_URL}/expenses/add`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    },
    body: {
        amount: 50.00,
        category: 'Food',  // Food, Hotel, Transport, Activities, Shopping, Other
        description: 'Lunch at local restaurant',
        tripId: 'TRIP_ID_HERE'  // Optional
    }
};

/**
 * 15. GET EXPENSES
 * GET /api/expenses/list
 */
const getExpenses = {
    method: 'GET',
    url: `${BASE_URL}/expenses/list`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

/**
 * 16. GET TRIP EXPENSES
 * GET /api/expenses/trip/:tripId
 */
const getTripExpenses = {
    method: 'GET',
    url: `${BASE_URL}/expenses/trip/TRIP_ID_HERE`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

/**
 * 17. GET EXPENSE BY ID
 * GET /api/expenses/:id
 */
const getExpenseById = {
    method: 'GET',
    url: `${BASE_URL}/expenses/EXPENSE_ID_HERE`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

/**
 * 18. UPDATE EXPENSE
 * PUT /api/expenses/:id
 */
const updateExpense = {
    method: 'PUT',
    url: `${BASE_URL}/expenses/EXPENSE_ID_HERE`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    },
    body: {
        amount: 75.00,
        description: 'Updated lunch expense'
    }
};

/**
 * 19. DELETE EXPENSE
 * DELETE /api/expenses/delete/:id
 */
const deleteExpense = {
    method: 'DELETE',
    url: `${BASE_URL}/expenses/delete/EXPENSE_ID_HERE`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

/**
 * 20. GET EXPENSE SUMMARY
 * GET /api/expenses/summary/:tripId
 */
const getExpenseSummary = {
    method: 'GET',
    url: `${BASE_URL}/expenses/summary/TRIP_ID_HERE`,
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

// ==================== CURL COMMANDS ====================

/**
 * Copy and paste these in your terminal to test APIs
 */

// Register
// curl -X POST http://localhost:5000/api/auth/register \
//   -H "Content-Type: application/json" \
//   -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

// Login
// curl -X POST http://localhost:5000/api/auth/login \
//   -H "Content-Type: application/json" \
//   -d '{"email":"john@example.com","password":"password123"}'

// Save the token from login response and use it:
// curl -X GET http://localhost:5000/api/auth/me \
//   -H "Authorization: Bearer YOUR_TOKEN"

// Generate trip
// curl -X POST http://localhost:5000/api/trips/generate-plan \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer YOUR_TOKEN" \
//   -d '{"destination":"Paris","budget":3000,"days":7}'

// Add expense
// curl -X POST http://localhost:5000/api/expenses/add \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer YOUR_TOKEN" \
//   -d '{"amount":50,"category":"Food","description":"Lunch"}'

// ==================== TEST SCENARIOS ====================

/**
 * Complete User Journey Test
 * 
 * 1. Register new user
 * 2. Login with credentials
 * 3. Copy token from response
 * 4. Generate a travel plan (Paris, 3000, 7)
 * 5. Copy trip ID from response
 * 6. Confirm booking with trip ID
 * 7. Add multiple expenses
 * 8. Get expenses list
 * 9. Get expense summary for trip
 * 10. Get my bookings
 */

// ==================== SUCCESS RESPONSES ====================

/**
 * Example success responses to expect
 */

const registerResponse = {
    message: 'User registered successfully',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    user: {
        id: '507f1f77bcf86cd799439011',
        name: 'John Doe',
        email: 'john@example.com'
    }
};

const generatePlanResponse = {
    message: 'Travel plan generated successfully',
    trip: {
        _id: '507f1f77bcf86cd799439012',
        userId: '507f1f77bcf86cd799439011',
        destination: 'Paris',
        budget: 3000,
        days: 7,
        status: 'planning',
        costs: {
            hotel: 1200,
            food: 900,
            transport: 450,
            activities: 450
        },
        itinerary: [
            {
                day: 1,
                title: 'Paris - Day 1',
                morning: 'Breakfast at a local café',
                afternoon: 'Visit Eiffel Tower',
                evening: 'Dinner and rest'
            }
            // ... more days
        ],
        places: [
            {
                name: 'Eiffel Tower',
                description: 'Iconic monument with city views',
                cost: 25,
                icon: '🗼'
            }
            // ... more places
        ]
    },
    plan: {
        // Same as trip object
    }
};

const expenseResponse = {
    message: 'Expense added successfully',
    expense: {
        _id: '507f1f77bcf86cd799439013',
        userId: '507f1f77bcf86cd799439011',
        tripId: '507f1f77bcf86cd799439012',
        amount: 50,
        category: 'Food',
        description: 'Lunch at local restaurant',
        date: '2024-01-15T10:30:00Z'
    }
};

// ==================== POSTMAN INSTRUCTIONS ====================

/**
 * To test in Postman:
 * 
 * 1. Create a new collection "AI Travel Planner"
 * 2. Create environment variable:
 *    - base_url: http://localhost:5000/api
 *    - token: (empty initially)
 * 
 * 3. Add requests:
 *    - Register User (POST)
 *    - Login (POST) - set token after this
 *    - Generate Plan (POST)
 *    - Add Expense (POST)
 *    - Get Expenses (GET)
 * 
 * 4. In Login response, go to Tests tab:
 *    var jsonData = pm.response.json();
 *    pm.environment.set("token", jsonData.token);
 * 
 * 5. In Authorization tab, select Bearer Token
 *    Token: {{token}}
 * 
 * 6. Export collection and share with team
 */

// ==================== ERROR RESPONSES ====================

/**
 * Example error responses
 */

const unauthorized = {
    status: 401,
    message: 'Not authorized to access this route'
};

const notFound = {
    status: 404,
    message: 'Trip not found'
};

const badRequest = {
    status: 400,
    message: 'Please provide all required fields'
};

const serverError = {
    status: 500,
    message: 'Error generating travel plan',
    error: 'Error message details'
};

export {
    registerUser,
    loginUser,
    getCurrentUser,
    generateTravelPlan,
    getMyTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    confirmBooking,
    getMyBookings,
    getBookingById,
    updateBookingStatus,
    cancelBooking,
    addExpense,
    getExpenses,
    getTripExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary
};
