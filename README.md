# GiveHopeNow - Crowdfunding Platform

GiveHopeNow is a modern crowdfunding platform that empowers communities to create lasting positive change around the world. This project includes both a React frontend and Node.js/Express backend.

## Features

- User authentication and profile management
- Project creation and management
- Project discovery and filtering
- Donation processing with PayPal integration
- Responsive design for all devices
- Dark mode support

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Redux Toolkit for state management
- Tailwind CSS for styling
- SASS for advanced styling
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- PayPal integration for payments
- Razorpay integration (optional)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB connection (local or Atlas)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/givehopenow.git
   cd givehopenow
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm install
   cd backend
   npm install
   cd ..
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory with the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=8080
     JWT_SECRET=your_jwt_secret
     PAYPAL_CLIENT_ID=your_paypal_client_id
     PAYPAL_CLIENT_SECRET=your_paypal_client_secret
     ```

4. Seed the database with initial data:
   ```
   npm run seed
   ```

### Running the Application

1. Start both frontend and backend concurrently:
   ```
   npm run dev:all
   ```

2. Or start them separately:
   - Frontend: `npm run dev`
   - Backend: `npm run backend`

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project
- `GET /api/projects/category-counts` - Get project counts by category
- `GET /api/projects/related` - Get related projects

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/change-password` - Change user password

### Payments
- `POST /api/payments/paypal/create-order` - Create a PayPal order
- `POST /api/payments/paypal/capture-order` - Capture a PayPal order

## Testing with Postman

You can test the API endpoints using Postman:

1. Import the Postman collection from the `postman` directory
2. Set up environment variables in Postman:
   - `baseUrl`: http://localhost:8080/api
   - `token`: (will be set automatically after login)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [PayPal API](https://developer.paypal.com/)
