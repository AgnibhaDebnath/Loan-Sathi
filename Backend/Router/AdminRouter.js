const express = require("express")
const AdminRouter = express.Router();
const Contorller=require("../Controller/AdminController")
AdminRouter.get("/loan-application", Contorller.getLoanDetails)
AdminRouter.post("/update-status", Contorller.Update_statsu_of_borrower)
AdminRouter.post("/verify-password",Contorller.verify_password)
module.exports = AdminRouter