const express = require("express")

const clintRouter = express.Router();

const ClintController=require("../Controller/ClientController")
clintRouter.post("/apply", ClintController.LoanApplyVerification)
clintRouter.post("/borrowerLogin", ClintController.FindBorrower)
clintRouter.get("/loan-status", ClintController.loanDataForAuthUser)
clintRouter.get("/check-token",ClintController.checkToken)
module.exports = clintRouter
