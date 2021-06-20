const mysql = require('mysql');
const {promisify} = require("util");
const databaseConfig = {
	host     : 'localhost',
	user     : 'root',
	password : 'maremar2001',
	database : 'the_lab'
 }
//  create pool connection with DB
 const pool = mysql.createPool(databaseConfig)
//  convert normal query to promise instead of callbacks
 const promiseQuery = promisify(pool.query).bind(pool)
class Database{
    async getLabsNames()  {
        try {
          let query = `SELECT lab_name FROM the_lab.lab;`;
          let result = await promiseQuery(query);
          return Promise.resolve(result);
        } catch(err) {
          console.log(err);
          return Promise.reject({
            status: 400,
            message: "failed to list labs names"
          })
        }
      }
      
      // get lab by name
      async getLabByName(labName)  {
        try {
          let query = `SELECT * FROM the_lab.lab WHERE lab_name='${labName}'`
          let result = await promiseQuery(query);
          return Promise.resolve(result[0]);
        } catch(err) {
          console.log(err);
          return Promise.reject({
            status: 400,
            message: "failed to get lab"
          })
        }
      }
      
      
      async getLabservices(labphone)  {
        try {
          let query = `SELECT * FROM the_lab.services WHERE lab_ph='${labphone}'`
          let result = await promiseQuery(query);
          return Promise.resolve(result);
        } catch(err) {
          console.log(err);
          return Promise.reject({
            status: 400,
            message: "no services to this lab"
          })
        }
      }
      // add required sample
      async addRequiredSample(data) {
        try {
          let sql = `INSERT INTO required_sample(lab_phone, require_sam)
                    VALUES(${data.lab_phone}, '${data.require_sam}')
            `;
            await promiseQuery(sql);
            return Promise.resolve({
              status: 200,
              message: "required sample inserted!"
            })
        }catch(err) {
          return Promise.reject({
            status: 400,
            message: "failed to inser required sample",
            error: err
          })
        }
        
      }


      async addMassege(data) {
        try {
          let sql = `INSERT INTO massege_to_company(insurance_phone, massege)
                    VALUES(${data.insurance_phone}, '${data.message}')
            `;
            await promiseQuery(sql);
            return Promise.resolve({
              status: 200,
              message: "Massege send!"
            })
        }catch(err) {
          return Promise.reject({
            status: 400,
            message: "failed to send massege",
            error: err
          })
        }
      }
     
      async getrequiredLab(labphone)  {
        try {
          let query = `SELECT * FROM the_lab.required_sample WHERE lab_phone='${labphone}'`
          let result = await promiseQuery(query);
          return Promise.resolve(result);
        } catch(err) {
          console.log(err);
          return Promise.reject({
            status: 400,
            message: "No Required Sample That Required From This Lab"
          })
        }
      }

      async getinsurancesNames()  {
        try {
          let query = `SELECT insurance_name FROM the_lab.insurance_company;`;
          let result = await promiseQuery(query);
          return Promise.resolve(result);
        } catch(err) {
          console.log(err);
          return Promise.reject({
            status: 400,
            message: "failed to list Insurance Companys names"
          })
        }
      }
   
      
      // get insurance company by name
      async getinsuranceByName(insuranceName)  {
        try {
          let query = `SELECT * FROM the_lab.insurance_company WHERE insurance_name='${insuranceName}'`
          let result = await promiseQuery(query);
          return Promise.resolve(result[0]);
        } catch(err) {
          console.log(err);
          return Promise.reject({
            status: 400,
            message: "failed to get insurance company"
          })
        }
      }
      
       
}



const DB = new Database();




module.exports = DB;