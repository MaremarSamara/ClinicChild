
const DB = require("../DB/index");
const Mailer = require("../services/Mailer");
class LabController {
   async  getLab(req, res){
        try {
          let labsNames = await DB.getLabsNames();
          labsNames = labsNames.map(obj => obj.lab_name);
          let labName = req.params.labName;
          let lab = typeof labName === "string" ? await DB.getLabByName(labName) : null;
          //this function return html using a template enjene...
         // return res.render("pages/lab", {title: "Labs", labsNames, lab})
         //use res.json to return a json object as an API...
         res.status(200).json({title: "Labs", labsNames, lab})
        } catch(err) {
          console.log(err);
          //return an error page using the template enjene...
         // return res.render("pages/error", {message: err.message, title: "error page"});
         res.status(400).json({message: err.message, title: "error page"})
        }
      }
      async getLabServices(req, res) {
        try {
            let labphone=req.params.labphone;
            let labservices = await DB.getLabservices (labphone);
            //return res.render("pages/services", { labservices, title: "lab services"})
            res.status(200).json({ labservices, title: "lab services"})
          } catch(err) {
            console.log(err);
           // return res.render("pages/error", {message: err.message, title: "error page"});
           res.status(400).json( {message: err.message, title: "error page"})
          }
      }

      async getrequiredLab(req, res) {
        try {
            let labphone=req.params.labphone;
            let labrequiredsamples = await DB.getrequiredLab (labphone);
            //return res.render("pages/Requiredsample", { labrequiredsamples, title: "Required Sample From this Lab"})
         res.status(200).json( { labrequiredsamples, title: "Required Sample From this Lab"})
          } catch(err) {
            console.log(err);
            //return res.render("pages/error", {message: err.message, title: "error page"});
         res/status(400).json( {message: err.message, title: "error page"})
          }
      }
      // send message by mail
      async sendMessage(req, res) {
        try {
            let lab = await DB.getLabByName(req.body.lab_name);
            let data = {lab_phone: lab.phone, require_sam: req.body.require_sam};
            console.log(req.body.require_sam, data);
            let mail = {from: "clinic App", to: lab.email, subject: "hello Lab", text: data.require_sam};
            await Mailer.sendMail(mail);
            // insert to database
            await DB.addRequiredSample(data);
            return res.status(200).json({message: "required sample is sent successfully", status: 200})
        } catch(err) {
          console.log(err);
          req.flash("error", "failed to send message");
         // return res.render("pages/lab", {title: "error page", message: "failed to send message"})
         res.status(400).json( {message: err.message, title: "error page"})
        }
      }
}


process.on("unhandledRejection", (reason, promise) => {
  console.log(reason);
})
module.exports = new LabController();