const express = require("express")
const AuthRouter = express.Router();
const AuthController=require("../Controller/authController")

AuthRouter.post("/api/auth/signup", AuthController.SignUp);
AuthRouter.post("/api/auth/Login",AuthController.Login)
module.exports = AuthRouter;