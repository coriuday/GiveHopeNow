const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const morgan = require("morgan")
const path = require("path")
const http = require("http")

// Load environment variables
dotenv.config()

// Import routes
const authRoutes = require("./routes/auth")
const projectRoutes = require("./routes/projects")
const userRoutes = require("./routes/users")
const paymentRoutes = require("./routes/payments")

// Initialize express app
const app = express()
const PORT = process.env.PORT || 8080

// CORS configuration - more specific to allow only the frontend origin
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' // Change in production
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175'],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/users", userRoutes)
app.use("/api/payments", paymentRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: err.message || "Something went wrong!",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    
    // Create HTTP server
    const server = http.createServer(app)
    
    // Function to find an available port
    const startServer = (port) => {
      // Ensure port is a number
      const portNumber = parseInt(port, 10);
      
      server.listen(portNumber)
        .on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            console.log(`Port ${portNumber} is busy, trying port ${portNumber + 1}`)
            startServer(portNumber + 1)
          } else {
            console.error('Server error:', err)
          }
        })
        .on('listening', () => {
          const actualPort = server.address().port
          console.log(`Server running on port ${actualPort}`)
          // Update the .env file for frontend reference
          console.log(`API URL: http://localhost:${actualPort}/api`)
        })
    }
    
    // Start the server
    startServer(PORT)
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

