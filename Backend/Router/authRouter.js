const express = require("express")
const AuthRouter = express.Router();
const AuthController=require("../Controller/authController")

AuthRouter.post("/signup", AuthController.signUp);

module.exports = AuthRouter;