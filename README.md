# ✈️ AI Travel Planner with Budget Optimizer

A full-stack web application that helps users plan their trips with intelligent budget optimization. Features include destination selection, day-wise itinerary generation, booking management, and expense tracking.

## 🌟 Features

### Frontend Features
- **Modern UI Design**: Glassmorphism styling with smooth animations
- **Authentication System**: Register and login with JWT security
- **Dashboard**: Input trip details and generate AI-powered plans
- **Travel Plans**: View day-wise itinerary with budget breakdown
- **Map Integration**: Google Maps to visualize destinations
- **Booking System**: Select and confirm places to visit
- **Expense Tracker**: Add, track, and manage travel expenses
- **Responsive Design**: Works seamlessly on mobile and desktop

### Backend Features
- **JWT Authentication**: Secure user authentication
- **MongoDB Integration**: Persistent data storage
- **RESTful API**: Clean and organized API endpoints
- **Budget Optimization**: Intelligent budget allocation
- **Trip Management**: CRUD operations for trips
- **Booking Management**: Handle place selections and confirmations
- **Expense Tracking**: Track and categorize expenses

## 📁 Project Structure

```
AI Travel Planner/
├── frontend/
│   ├── index.html          # Main HTML file with all pages
│   ├── style.css           # Modern styling with glassmorphism
│   └── script.js           # Vanilla JavaScript logic
│
├── backend/
    ├── server.js           # Express server setup
    ├── package.json        # Node.js dependencies
    ├── .env.example        # Environment variables template
    │
    ├── middleware/
    │   └── auth.js         # JWT authentication middleware
    │
    ├── models/
    │   ├── User.js         # User schema
    │   ├── Trip.js         # Trip schema
    │   ├── Booking.js      # Booking schema
    │   └── Expense.js      # Expense schema
    │
    └── routes/
        ├── auth.js         # Authentication endpoints
        ├── trips.js        # Trip endpoints
        ├── bookings.js     # Booking endpoints
        └── expenses.js     # Expense endpoints
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **npm** package manager
- **Git** (optional)
- **Google Maps API Key** (for map functionality)

### Installation

#### 1. Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-travel-planner
JWT_SECRET=your_secure_secret_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

5. Start the backend server:
```bash
npm run dev
```

#### 2. Frontend Setup

1. Open `frontend/index.html` in your browser
2. Update Google Maps API Key in `frontend/index.html`:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY"></script>
```

## 📱 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Plan Trip**: Enter destination, budget, and number of days
3. **View Itinerary**: See day-wise activities and budget breakdown
4. **Book Places**: Confirm places to visit and save bookings
5. **Track Expenses**: Add and monitor travel expenses

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Trips
- `POST /api/trips/generate-plan` - Generate trip itinerary
- `GET /api/trips` - Get user's trips
- `POST /api/trips/save` - Save trip booking

### Bookings
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create booking

### Expenses
- `GET /api/expenses` - Get user's expenses
- `POST /api/expenses` - Add expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## 🎨 Technologies Used

### Frontend
- **HTML5/CSS3**: Modern responsive design
- **Vanilla JavaScript**: DOM manipulation and API calls
- **Google Maps API**: Location visualization

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
