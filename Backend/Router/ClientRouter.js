const express = require("express")
const clintRouter = express.Router();
const ClintController=require("../Controller/ClientController")


clintRouter.post("/apply", ClintController.LoanApplyVerification)
module.exports = clintRouter
