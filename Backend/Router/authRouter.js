const express = require("express")
const authRouter = express.Router();
const AuthController=require("../Controller/authController")
authRouter.post("/api/auth/signup", AuthController.SignUp);
authRouter.post("/api/auth/Login",AuthController.Login)
module.exports = authRouter;