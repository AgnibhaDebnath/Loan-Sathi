const express = require("express")
const adminRouter = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const adminController=require("../Controller/adminController")
const rate_limiter = require("express-rate-limit")
const limiter = rate_limiter.rateLimit({
  windowMs: 5 * 60 * 1000,
  max:5,
  message: { error: "Too many failed login attempts. Try again later." },
  skipSuccessfulRequests:true
  
})



module.exports = adminRouter