const db = require("../models");
const countryModel = require("../models/country.model");
const Country = db.country;




// Create and Save a new Blog
exports.create = (req, res) => {
    var country = req.body;
    var countryList = [];

    for(var i = 0;i<country.length;i++){
    const countryModel = {
        Name:country[i].name,
        Flag:country[i].flag,
        Code:country[i].code,
        DialCode:country[i].dial_code,
        

    };
    countryList.push(countryModel);

  
    Country.create(countryModel)
    .then(data  => {
     return;
    }) 
 
    .catch(err => {
      res.status(200).send({
          status:false,
          message:
          err.message || "Some error occurred.",
          data:{}
      });
    });
    }
    res.status(200).send({
        status:true,
       
      });
   
  };

exports.findAll = (req, res) => {
    Country.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(200).send({
            status:false,
            message:
              err.message || "Some error occurred while retrieving User.",
              data:{}
          });
        });
    };


 