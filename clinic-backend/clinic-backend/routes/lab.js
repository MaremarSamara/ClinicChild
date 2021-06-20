const express = require("express");
const Mailer = require("../services/Mailer");
const LabController = require("../controllers/index");
const LabRouter = express.Router();


LabRouter.get("/:labName?", LabController.getLab);
  
LabRouter.get("/services/:labphone", LabController.getLabServices);

LabRouter.get("/Requiredsample/:labphone", LabController.getrequiredLab);



LabRouter.post("/message", LabController.sendMessage)
  module.exports = LabRouter;