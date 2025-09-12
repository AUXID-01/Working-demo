import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import authRouter from './src/routes/auth.routes.js'
import userRouter from './src/routes/user.routes.js';

const app = express()
const PORT = process.env.PORT ;

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming body:", req.body);
  next();
});


//routes
app.use('/api/auth', authRouter);
app.use("/api/user", userRouter);


//GET /api/user/me → Get logged-in user’s info (secured with JWT).
//PUT /api/user/me → Update personal info (secured with JWT + validation).


mongoose.connect(process.env.MONGODB_URI).then(() =>{
    console.log("DB Connected")
}).catch((err) =>{
    console.log(err)
    process.exit(1);
})



app.get('/', (req, res) =>{
    res.send("Welcome to MedTech")
})


//Global error middleware (must be after routes)

app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err);
  // if error already has status code, use it, otherwise 500
    res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

//app.use('/api/auth', authRouter);
// now endpoints are: POST /api/auth/register and POST /api/auth/login



app.listen(PORT, () =>{
    console.log("Server started")
})