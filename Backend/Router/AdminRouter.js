const express = require("express")
const AdminRouter = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Contorller = require("../Controller/AdminController")
const rate_limiter = require("express-rate-limit")
const limiter = rate_limiter.rateLimit({
  windowMs: 5 * 60 * 1000,
  max:5,
  message: { error: "Too many failed login attempts. Try again later." },
  skipSuccessfulRequests:true
  
})

AdminRouter.post("/loan-Details", Contorller.add_loan_detials)
AdminRouter.post("/borrower-Details",upload.single("image"),Contorller.add_borrower_details)
AdminRouter.post("/loan-application", Contorller.getLoanDetails)

AdminRouter.post("/update-status", Contorller.Update_statsu_of_borrower)
AdminRouter.post("/verify-password",limiter , Contorller.verify_password)
AdminRouter.post("/verify-admin-mobileNo",limiter , Contorller.verify_admin_mobileNo)
AdminRouter.post("/api/admin-login",limiter , Contorller.verify_admin)
AdminRouter.post("/check-token-for-admin", Contorller.verify_token_For_admin)
AdminRouter.get("/get-emi-for-admin", Contorller.get_emi_details_for_Admin)
AdminRouter.post("/update-payment",Contorller.update_payment)

module.exports = AdminRouter