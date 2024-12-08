# Recipology - Recipe Website

## GITHUB
https://github.com/noor-eld/Recipology

## Overview
Recipology is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) recipe sharing platform that allows users to create, share, and discover recipes.

## Prerequisites
- Node.js (v14.0.0 or higher)
- MongoDB (v4.4 or higher)
- npm (v6.0.0 or higher)

## Project Structure
```
recipology/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── context/    # Context providers
│   │   └── data/       # Static data
│   └── public/         # Static files
└── server/             # Backend Node.js/Express application
    ├── src/
    │   ├── config/
    │   ├── controllers/    
    │   ├── data/
    │   ├── models/
    │   ├── routes/
    │   └── middleware/
    │   ├── services/
    └── uploads/        # Recipe images storage
```

## Configuration

### Server Configuration
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a `.env` file in the server root with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/recipology
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```

3. Install server dependencies:
   ```bash
   npm install
   ```

### Client Configuration
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install client dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
1. Start the server (from the server directory):
   ```bash
   npm run dev
   ```

2. Start the client (from the client directory):
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Deployment

#### Server Deployment
1. Build the server:
   ```bash
   cd server
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

#### Client Deployment
1. Build the client:
   ```bash
   cd client
   npm run build
   ```

2. The build files will be in the `build` directory, ready to be served by a static file server.

## Database Setup
1. Install MongoDB on your system
2. Start MongoDB service
3. The application will automatically create the required collections

## Features
- User authentication (JWT)
- Recipe creation and management
- Image upload for recipes
- Recipe search and filtering
- Favorite recipes functionality
- Category-based browsing
- Responsive design

## API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user

### Recipes
- GET /api/recipes - Get all recipes
- GET /api/recipes/:id - Get single recipe
- POST /api/recipes - Create recipe
- PUT /api/recipes/:id - Update recipe
- DELETE /api/recipes/:id - Delete recipe
- GET /api/recipes/user/myrecipes - Get user's recipes
- GET /api/recipes/search - Search recipes

## Security
- Password hashing using bcrypt
- JWT authentication
- Protected routes
- Input validation
- Image upload validation

## Maintenance
- Regularly backup the MongoDB database
- Monitor server logs for errors
- Update dependencies periodically
- Check disk space for uploaded images

## Troubleshooting
1. Database Connection Issues:
   - Verify MongoDB is running
   - Check MONGO_URI in .env
   - Ensure network connectivity

2. Image Upload Issues:
   - Verify uploads directory permissions
   - Check file size limits
   - Ensure proper multipart/form-data handling

3. Authentication Issues:
   - Check JWT_SECRET in .env
   - Verify token expiration
   - Clear browser localStorage if needed

## Support
For additional support or questions, please contact the development team or create an issue in the project repository.
