const { Query } = require("pg");
const db = require("../models");
const investmentModel = require("../models/investment.model");
const investment = db.investment;
const startupprofile=db.startupprofile;
const investorprofile=db.investorprofile;
const Sequelize = require('sequelize');
const { user } = require("../models");
const User = db.user;


const op = Sequelize.Op;
const operatorsAliases = {
    $eq: op.eq,
    $or: op.or,
}


// Create and Save a new Investment
exports.create = (req, res) => {
    // Create a startupdocument request
    const investmentModel = {
        Id:req.body.id,
        StartupProfileId:req.body.StartupProfileId,
        InvestorProfileId:req.body.InvestorProfileId,
        Amount:req.body.Amount,
        Stake:req.body.Stake,       
        CreatedDate:new Date(),
        UpdatedDate:new Date()
    };
  
    investment.create(investmentModel)
    .then(investment  => {
      res.status(200).send({
        status:true,
        message:'Investment save successfully!',
        data:{
            investment:investment
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

  // Create and Save a new Investment for mobile
exports.createInvestments = (req, res) => {
  // Create a startupdocument request
  const investmentModel = {
      StartupProfileId:req.body.StartupProfileId,
      InvestorProfileId:req.profileId,
      Amount:req.body.Amount,
      CreatedDate:new Date(),
      UpdatedDate:new Date()
  };

  investment.create(investmentModel)
  .then(investment  => {
    res.status(200).send({
      status:true,
      message:'Investment save successfully!',
      data:{
          investment:investment
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

// Retrieve all Investkments from the database.
exports.findAll = (req, res) => {
  
    const Investorid=  req.params.investorid;
        investment.findAll({
          where:{InvestorProfileId:Investorid},
                include: [{
                model: investorprofile, 
                include: [{
                  model: User,
                  attributes:["Name","Name"]

                }],        
                attributes:["Id","Id"]
                },{
                    model: startupprofile,
                    attributes:["StartupName","StartupName","Id","Id"]  
                }] , 
            })
            .then(data => {
                if(data.length==0){
                    return res.status(200).send({ status:false, message: "investment does not found." ,data:{}});
                }
                res.send(data);
            })
            .catch(err => {
                res.status(200).send({
                status:false,
                message:
                    err.message || "Some error occurred while retrieving investment.",
                    data:{}
                });
            });
      
  };
  
// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    investment.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error retrieving investment with id=" + id,
          data:{}
        });
      });
  };


// Update a investment by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    investment.update(req.body, {
      where: { Id: id }
    })
      .then(num => {
        if (num == 1) {
            investment.findByPk(id).then(result => {
          res.status(200).send({
            status:true,
            message:'Investment was updated successfully.',
            data:{
                investment:result
            }
        });
      });
        } else {
          res.status(200).send({
            status:false,
            message: `Cannot update Investment with id=${id}. Maybe account was not found or req.body is empty!`,
            data:{}
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error updating Investment with id=" + id,
          data:{}
        });
      });
  };
  
// Delete a investment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    investment.destroy({
      where: { Id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            status:true,
            message: "investment was deleted successfully!",
            data:{}
          });
        } else {
          res.send({
            status:false,
            message: `Cannot delete investment with id=${id}. Maybe investment was not found!`,
            data:{}
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Could not delete investment with id=" + id,
          data:{}
        });
      });
  };

  exports.myInvestment = (req,res) => {
       const id = req.profileId;
       var result = {
         invested:0,
         current:0,
         investments:[]
       }
       investment.findAll({
         where:{InvestorProfileId:id},include:[startupprofile]
      })
       .then(data => {
        if(data.length==0){
            return res.status(200).send({ status:false, message: "investment does not found." ,data:{}});
        }
        
        
        data.forEach(element => {
          var response= {
          Id:element.Id,
          Amount: changeAmountValue(element.Amount),
          Stake:element.Stake,
          StartupName:element.StartupProfile.StartupName,
          StartupDescription:element.StartupProfile.ProductDescription,
          Logo:""
          
          };
          result.invested += Number(element.Amount);
          result.current += Number(element.Amount);          
          result.investments.push(response);
        })
        result.current = changeAmountValue(result.current);
          result.invested = changeAmountValue(result.invested);
        res.status(200).send({
          status:true,
          data:{result}
        });
       })
      
  };

  changeAmountValue = (num) => {
    if(num > 9999999){
      return (num/10000000).toFixed(1) + 'C'; // convert to K for number from > 1000 < 1 million 
  }else if(num > 99999){
      return (num/100000).toFixed(1) + 'L'; // convert to M for number from > 1 million 
  }else if(num > 999){
      return (num/1000).toFixed(1) + 'K'; // convert to M for number from > 1 million 
  }else {
      return num; // if value < 1000, nothing to do
  };
  };
