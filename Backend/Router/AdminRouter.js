const express = require("express")
const AdminRouter = express.Router();
const Contorller=require("../Controller/AdminController")
AdminRouter.get("/loan-application", Contorller.getLoanDetails)
module.exports = AdminRouter