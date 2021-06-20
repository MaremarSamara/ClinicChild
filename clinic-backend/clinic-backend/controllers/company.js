const Mailer = require("../services/Mailer");
const DB = require("../DB/index");


class CompanyController{
// get the insurance companys...
async  getInsuranceCompany(req, res){
    try {
      let insurancesNames = await DB.getinsurancesNames();
      insurancesNames = insurancesNames.map(obj => obj.insurance_name);
      let insuranceName = req.params.insuranceName;
      let insurance = typeof insuranceName === "string" ? await DB.getinsuranceByName(insuranceName) : null;
      // this function returns html using a template engine
      // return res.render("pages/insurancecompany", {title: "Insurance Companys", insurancesNames, insurance})
      // use res.json to return a json object as an API
      return res.status(200).json({status: 200, title: "Insurance Companys", insurancesNames, insurance})
    } catch(err) {
      console.log(err);
      // return error page using the template engine
      // return res.render("pages/error", {message: err.message, title: "error page"});
      // return error using json as an API
      return res.status(400).json({status: 400, message: err.message })
    }
  }
  async sendMessage(req, res) {
    try {
        let company = await DB.getinsuranceByName(req.body.insurance_name);
        let data = {insurance_phone: company.insurance_phone, message: req.body.message};
        console.log(data, req.body.message);
        let mail = {from: "clinic App", to: company.email, subject: "Hello Insurance Company", text: data.message}
        await Mailer.sendMail(mail);
        // insert to database
        await DB.addMassege(data);
        req.flash("success", "mail has sent successfully");
        return res.status(200).json({message: "required sample is sent successfully", status: 200});
    } catch(err) {
      console.log(err);
      return res.status(400).json({status: 400, message: err.message});
    }
  }
}




module.exports = new CompanyController();