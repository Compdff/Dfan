const { user, startupfounder, investorpreference } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const StartupProfile = db.startupprofile;
const StartupFounder = db.startupfounder;
const Investorpreference = db.investorpreference;
const Op = db.Sequelize.Op;

// Create and Save a new Profile
exports.create = (req, res) => {
  
  // Create a StartupProfile
  const startupProfileModel = {
      StartupName: req.body.StartupName,
      RaisingFunds: req.body.RaisingFunds,
      OfferedStake: req.body.OfferedStake,
      ProductDescription: req.body.ProductDescription,
      Website: req.body.Website,
      Status: 0,
      DeckFilename: req.body.DeckFilename,
      DeckURL: req.body.DeckURL,
      CurrentState: 0,
      StateDetail: req.body.StateDetail,
      InitialEvaluation: req.body.InitialEvaluation,
      CurrentEvaluation: req.body.CurrentEvaluation,
      UserId:  req.body.UserId,
      StartupFounders: req.body.StartupFounders,
      Logo:req.body.Logo,
      AboutUs:req.body.AboutUs,
      Horizontal:req.body.Horizontal,
      TechnologyUsed:req.body.TechnologyUsed,
      Location:req.body.Location,
      BusinessModel:req.body.BusinessModel,
      WhatNHowProblemSolve:req.body.WhatNHowProblemSolve,
      HowBigMarketAvailable:req.body.HowBigMarketAvailable,
      IsIdeaSacaleDigitally:req.body.IsIdeaSacaleDigitally,
      HowProductFitInMarket:req.body.HowProductFitInMarket,
      YourUSP:req.body.YourUSP,
      IsRevenueDataShareable:req.body.IsRevenueDataShareable,
      ExitStrategyForUs:req.body.ExitStrategyForUs,
      IsAcceptTnC:req.body.IsAcceptTnC,
      VerticalId:req.body.VerticalId,
      CreatedDate: new Date(),
      UpdatedDate: new Date()
  };
  StartupProfile.findOne({where:{UserId:req.body.UserId}})
  .then(startupData=>{
    if(startupData==null){
      if(startupProfileModel.StartupFounders!=undefined&&startupProfileModel.StartupFounders.length>0){
        StartupProfile.create(startupProfileModel,{include: [ StartupFounder ]})
        .then(profile  => {
          User.update({
            IsProfileCreated:true
          }, {
            where: { Id: req.body.UserId }
          })
            .then(num => {
              StartupProfile.findByPk(profile.Id,
                {include: [StartupFounder,User],
              }).then(result => {
                result = result.toJSON();
                result.User.logo = result.Logo;
                result.User.startupName = result.StartupName;
                result.User.currentState = result.CurrentState;
                var token = jwt.sign({ id: result.UserId ,profileId: profile.Id}, config.secret, {
                  expiresIn: 86400 // 24 hours
                });
              res.status(200).send({
                status:true,
                message:'Profile created successfully!',
                data:{
                  profile:result,
                  accessToken: token
              }
            });
          });
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
      }
      else{
        StartupProfile.create(startupProfileModel)
        .then(profile  => {
          User.update({
            IsProfileCreated:true
          }, {
            where: { Id: req.body.UserId }
          })
            .then(num => {
              StartupProfile.findByPk(profile.Id,
                {include: [StartupFounder,User],
              }).then(result => {
                result = result.toJSON();
                result.User.logo = result.Logo;
                result.User.startupName = result.StartupName;
                result.User.currentState = result.CurrentState;
                var token = jwt.sign({ id: result.UserId ,profileId: profile.Id}, config.secret, {
                  expiresIn: 86400 // 24 hours
                });
              res.status(200).send({
                status:true,
                message:'Profile created successfully!',
                data:{
                  profile:result,
                  accessToken: token
              }
            });
          });
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
      }
    }
    else{
      StartupProfile.update(req.body,{where:{Id:startupData.Id}})
      .then(num=>{
        StartupProfile.findByPk(startupData.Id,
          {include: [StartupFounder,User],
        }).then(result => {
          result = result.toJSON();
          result.User.logo = result.Logo;
          result.User.startupName = result.StartupName;
          result.User.currentState = result.CurrentState;
          var token = jwt.sign({ id: result.UserId ,profileId: startupData.Id}, config.secret, {
            expiresIn: 86400 // 24 hours
          });
        res.status(200).send({
          status:true,
          message:'Profile created successfully!',
          data:{
            profile:result,
            accessToken: token
        }
      });
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

    }
  })

};

// Retrieve all profiles from the database.
exports.findAll = (req, res) => {
  
  StartupProfile.findAll({include: [StartupFounder,User]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message:
          err.message || "Some error occurred while retrieving profiles.",
          data:{}
      });
    });
};

// Find a single profile with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  StartupProfile.findByPk(id,
    {include:[StartupFounder,User]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error retrieving Profile with id=" + id,
        data:{}
      });
    });
};


// Update a Profile by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  if(req.body.Status!=undefined){

  StartupProfile.update(req.body, {
    where: { Id: id }
  })
    .then(num => {
      if (num == 1) {
        StartupProfile.findOne({where:{Id:id}})
          .then(startupProfile=>{
            User.update(req.body,{where:{Id:startupProfile.UserId}})
            .then(result=>{
              res.status(200).send({
                status:true,
                message: "Profile was updated successfully.",
                data:{            
                }
              });
            })
        
      })
      } else {
        res.status(200).send({
          status:false,
          message: `Cannot update Profile with id=${id}. Maybe Profile was not found or req.body is empty!`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error updating Profile with id=" + id,
        data:{}
      });
    });
  }
  else{
    StartupProfile.update(req.body, {
      where: { Id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            status:true,
            message: "Profile was updated successfully.",
            data:{            
            }
          });
        } else {
          res.status(200).send({
            status:false,
            message: `Cannot update Profile with id=${id}. Maybe Profile was not found or req.body is empty!`,
            data:{}
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error updating Profile with id=" + id,
          data:{}
        });
      });

  }
};


// Delete a :Profile with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  StartupProfile.destroy({
    where: { Id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "Profile was deleted successfully!",
          data:{}
        });
      } else {
        res.send({
          status:false,
          message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Could not delete Profile with id=" + id,
        data:{}
      });
    });
};

// Delete all Profile from the database.
exports.deleteAll = (req, res) => {
  StartupProfile.destroy({
  where: {},
  truncate: false
})
  .then(nums => {
    res.send({
      status:true,
       message: `${nums} Profile were deleted successfully!`,
      data:{} 
    });
  })
  .catch(err => {
    res.status(200).send({
      status:false,
      message:
        err.message || "Some error occurred while removing all Profile.",
        data:{}
    });
  });
};

// Find a single profile with an id
exports.findOneByUserId = (req, res) => {
  const id = req.params.id;
  StartupProfile.findAll({ where: { UserId: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error retrieving Profile with id=" + id,
        data:{}
      });
    });
};

// Update current valuation in startup
exports.updateCurrentValuation = (req, res) => {
const requestModel ={CurrentEvaluation:req.body.Valuation}
  StartupProfile.update(requestModel, {
    where: { Id: req.body.StartupId }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "Profile Valuation was updated successfully.",
          data:{            
          }
        });
      } else {
        res.status(200).send({
          status:false,
          message: `Cannot update Profile with id=${id}. Maybe Profile was not found or req.body is empty!`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error updating Profile with id=" + id,
        data:{}
      });
    });
};

//Retrive query by startup
exports.findQuery = (res,req) =>{
  const id = req.profileId
Query.findOne({where:{StartupProfileId:id}})
.then(data =>{
  res.send(data);
})
.catch(err => {
  res.status(200).send({
    status:false,
    message: "Error retrieving Query with id=" + id,
    data:{}
  });
});
};
