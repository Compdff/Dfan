const db = require("../models");
const CompanySettings = db.companysettings;



   // Create and Save a new Vertical
exports.create = (req, res) => {
    
  CompanySettings.findAll()
  .then(compSetting => {
 if(compSetting.length>0){
  CompanySettings.update(req.body, {
    where: { Id: compSetting[0].Id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "Company Settings was updated successfully.",
          data:{       
          }
        });
      } else {
        res.status(200).send({
          status:false,
          message: `Cannot update Company Settings with id=${id}. May be settings was not found or req.body is empty!`,
          data:{}
        });
      }
    })
 }
 else{
  CompanySettings.create(req.body)
  .then(data  => {
    res.status(200).send({
      status:true,
      message:'Company Settings created successfully!',
      data:{
          companySettings:data
    }
  });
  })
 }
  }) 
     
    .catch(err => {
      res.status(200).send({
          status:false,
          message:
          err.message || "Some error occurred.",
          data:{}
      });
    });
  };


  // Update a CompanySettings by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
 

  CompanySettings.update(req.body, {
    where: { Id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "Company Settings was updated successfully.",
          data:{       
          }
        });
      } else {
        res.status(200).send({
          status:false,
          message: `Cannot update Company Settings with id=${id}. May be settings was not found or req.body is empty!`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error updating Settings with id=" + id,
        data:{}
      });
    });
};


exports.findOne = (req, res) => {
    const id = 1;
  
    CompanySettings.findByPk(id)
      .then(data => {
        if(data){
          res.send(data);
        }
        else{
          res.status(200).send({
            status:false,
            message: "CompanySettings was not found with id=" + id,
            data:{}
          });
        }
        
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error retrieving Profile with id=" + id,
          data:{}
        });
      });
  };
