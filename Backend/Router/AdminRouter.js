const express = require("express")
const AdminRouter = express.Router();
const Contorller=require("../Controller/AdminController")
AdminRouter.get("/loan-application", Contorller.getLoanDetails)
AdminRouter.post("/update-status",Contorller.Update_statsu_of_borrower)
module.exports = AdminRouter