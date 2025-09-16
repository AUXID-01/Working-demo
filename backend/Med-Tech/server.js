import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

import authRouter from './src/routes/auth.routes.js'
import userRouter from './src/routes/user.routes.js'

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],  // allow both frontends
  credentials: true,
}))

const PORT = process.env.PORT 

// Middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log("Incoming body:", req.body)
  next()
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("DB Connected")
}).catch((err) => {
  console.error(err)
  process.exit(1)
})

app.get('/', (req, res) => {
  res.send("Welcome to MedTech")
})

// Global error handler (after routes)
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err)
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
