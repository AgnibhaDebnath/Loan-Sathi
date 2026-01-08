const express = require("express")

const clintRouter = express.Router();

const ClintController=require("../Controller/ClientController")
clintRouter.post("/apply", ClintController.LoanApplyVerification)
clintRouter.post("/check-borrower-exist", ClintController.FindBorrower)
clintRouter.get("/loan-status", ClintController.loanDataForAuthUser)
clintRouter.post("/api/borrower-login",ClintController.verifyBorrower)
clintRouter.get("/check-token", ClintController.checkToken)
clintRouter.get("/get-loan-details", ClintController.get_loan_details)
clintRouter.post("/get-emi-details",ClintController.get_emi_details)
module.exports = clintRouter
