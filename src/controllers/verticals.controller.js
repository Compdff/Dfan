const db = require("../models");
const verticalsModel = require("../models/verticals.model");
const Verticals = db.verticals;

// Retrieve all Verticals from the database.
exports.findAll = (req, res) => {
    
    Verticals.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message:
            err.message || "Some error occurred while retrieving verticals.",
            data:{}
        });
      });
  };

   // Create and Save a new Vertical
exports.create = (req, res) => {
    const verticalsModel = {
        Name:req.body.Name,        
    };
  
    Verticals.create(verticalsModel)
    .then(vertical  => {
      res.status(200).send({
        status:true,
        message:'Vertical created successfully!',
        data:{
            vertical:vertical
      }
    });
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


  // Update a Vertical by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const verticalModel = {
     
      Name:req.body.Name

  };

  Verticals.update(verticalModel, {
    where: { Id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "Vertical was updated successfully.",
          data:{       
          }
        });
      } else {
        res.status(200).send({
          status:false,
          message: `Cannot update Vertical with id=${id}. May be Vertical was not found or req.body is empty!`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error updating Query with id=" + id,
        data:{}
      });
    });
};

// Delete a Vertical with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Verticals.destroy({
    where: { Id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "Vertical was deleted successfully!",
          data:{}
        });
      } else {
        res.send({
          status:false,
          message: `Cannot delete Vertical with id=${id}. Maybe Vertical was not found!`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Could not delete EveVerticalnt with id=" + id,
        data:{}
      });
    });
};
  
