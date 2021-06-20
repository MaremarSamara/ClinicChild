const {Router} = require("express");
const CompanyController = require("../controllers/company");


const CompanyRouter = Router();


CompanyRouter.get("/:insuranceName?", CompanyController.getInsuranceCompany);


CompanyRouter.post("/message", CompanyController.sendMessage)



module.exports = CompanyRouter;