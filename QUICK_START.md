# 🚀 Quick Start Guide

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install all required packages:
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- cors: Cross-origin resource sharing
- dotenv: Environment variables

## Step 2: Configure Environment Variables

1. In the `backend` folder, create a `.env` file:

```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai-travel-planner
JWT_SECRET=your_super_secret_key_change_this
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update MONGODB_URI in .env

## Step 4: Start Backend Server

```bash
cd backend
npm start
```

You should see:
```
╔════════════════════════════════════════════╗
║   🌍 AI Travel Planner Backend             ║
║   ✈️  Server running on port 5000         ║
║   📍 http://localhost:5000               ║
╚════════════════════════════════════════════╝
```

## Step 5: Start Frontend Server

In a new terminal:

```bash
cd frontend

# Using Python 3
python -m http.server 3000

# OR using Node.js
npx serve -s . -p 3000

# OR just open index.html in browser
```

## Step 6: Update Google Maps API

Edit `frontend/index.html` and replace:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY"></script>
```

Get your free API key: https://cloud.google.com/maps-platform

## Step 7: Open in Browser

Navigate to:
```
http://localhost:3000
```

## 🎯 Test the Application

### 1. Register a New User
- Click "Register"
- Enter details:
  - Name: John Doe
  - Email: john@example.com
  - Password: password123
- Click "Register"

### 2. Login
- Use your registered credentials
- Click "Login"

### 3. Create a Trip
- Destination: Paris
- Budget: 3000
- Days: 7
- Click "Generate Plan"

### 4. View Your Plan
- See day-wise itinerary
- Check budget breakdown
- Select places to visit

### 5. Track Expenses
- Go to "Expenses" tab
- Add an expense
- See progress bar update

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can generate travel plan
- [ ] Can view itinerary
- [ ] Can add expenses
- [ ] Budget progress bar works

## 🆘 Common Issues & Solutions

### Issue: "Cannot POST /api/auth/register"
**Solution**: 
- Check backend is running on 5000
- Check API_URL in script.js is correct

### Issue: MongoDB connection error
**Solution**:
- Start MongoDB: `mongod`
- Or use MongoDB Atlas (cloud)
- Or check MONGODB_URI in .env

### Issue: CORS error
**Solution**:
- Restart backend server
- Check frontend URL in CORS config (server.js)

### Issue: Google Maps not showing
**Solution**:
- Add Google Maps API key
- Enable Maps JavaScript API in Google Cloud Console

### Issue: Port 3000 already in use
**Solution**:
```bash
python -m http.server 8000
# Then open: http://localhost:8000
```

## 📱 API Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get current user (use token from login response)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"

# Generate trip plan
curl -X POST http://localhost:5000/api/trips/generate-plan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"destination":"Paris","budget":3000,"days":7}'
```

## 🔄 Development Workflow

### For Backend Development:
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### For Frontend Development:
Edit files in `frontend/` folder. Changes reflect immediately in browser.

### Making API Changes:
1. Update route in `backend/routes/`
2. Restart backend (if not using nodemon)
3. Update frontend `script.js` to call new endpoint

## 📚 File Structure Reference

```
Frontend:
- index.html: All HTML pages (register, login, dashboard, etc.)
- style.css: All styling with glassmorphism effects
- script.js: All JavaScript logic and API calls

Backend:
- server.js: Main server file
- models/: Database schemas
- routes/: API endpoints
- middleware/: Authentication middleware
- package.json: Dependencies
```

## 🎓 Next Steps

1. Customize the UI colors and fonts
2. Add more destinations to the database
3. Implement real payment processing
4. Add email notifications
5. Deploy to Heroku (backend) and Netlify (frontend)

## 🚀 Deployment

### Backend (Heroku):
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Frontend (Netlify):
```bash
npm run build  # if using a build tool
# Or just deploy the frontend folder
```

---

**Happy Coding! If you face any issues, check the README.md for detailed documentation.** ✈️
