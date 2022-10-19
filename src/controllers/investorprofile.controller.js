const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const investorpreferenceModel = require("../models/investorpreference.model");
const User = db.user;
const investorprofile = db.investorprofile;
const startupprofile = db.startupprofile;
const investorpreference = db.investorpreference;
const startupfounder = db.startupfounder;
const investment = db.investment;
const Op = db.Sequelize.Op;
const StartupFounder = db.startupfounder;
const Query = db.query;
const event = db.event;
const Referral = db.referral;


// Create and Save a new Profile
exports.create = (req, res) => {
  
  // Create a InvestorProfile
  const investorProfileModel = {
      Occupation: req.body.Occupation,
      Jobtitle: req.body.Jobtitle,
      CompanyName: req.body.CompanyName,
      LinkedinUrl: req.body.LinkedinUrl,
      Status: 0,
      PAN: req.body.PAN,
      AadharNo: req.body.AadharNo,
      InvestedStartupCount: req.body.InvestedStartupCount,
      IsInvestmentZero: req.body.IsInvestmentZero,
      IsPartOfAngel: req.body.IsPartOfAngel,
      InvestementAmount: req.body.InvestementAmount,
      StartupTypes:  req.body.StartupTypes,
      IsActive:  req.body.IsActive,
      UserId:req.body.UserId,
      CreatedDate: new Date(),
      UpdatedDate: new Date(),
      CreatedBy: req.body.CreatedBy,
      UpdatedBy: req.body.UpdatedBy
  };
  var referralCode = req.body.ReferralCode;

  

  investorprofile.create(investorProfileModel)
  .then(profile  => {
    User.update({
      IsProfileCreated:true
    }, {
      where: { Id: req.body.UserId }
    })
      .then(num => {
        investorprofile.findByPk(profile.Id,
          {include: [User],
        }).then(result => {
          if(referralCode!=""&&referralCode!=undefined){
          User.findOne(
            {where:{ReferralCode:referralCode}}
          )
          .then(user => {
            if(user)
            {
              investorprofile.findOne({
                where:{UserId:user.Id}
              })
              .then(investor =>{
                var referralObj = {
                  RefInvestorId:investor.Id,
                  InvestorId:result.Id,
                  CreatedDate:new Date()
                }
                Referral.create(referralObj);
              })
              
            }
          })
        }
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
};

// Retrieve all profiles from the database.
exports.findAll = (req, res) => {
  
  investorprofile.findAll({include: [User]})
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

  investorprofile.findByPk(id,{include: [User]})
    .then(data => {
      if(data){
        res.send(data);
      }
      else{
        res.status(200).send({
          status:false,
          message: "Profile was not found with id=" + id,
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


// Update a Profile by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  if(req.body.Status!=undefined){
   
    investorprofile.update(req.body, {
      where: { Id: id }
    })
      .then(num => {
        if (num == 1) {
          investorprofile.findOne({where:{Id:id}})
          .then(investorProfile=>{

            User.update(req.body,{
              where:{Id:investorProfile.UserId}
            })
            .then(result =>{
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
  investorprofile.update(req.body, {
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

  investorprofile.destroy({
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
  investorprofile.destroy({
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

  investorprofile.findAll({ where: { UserId: id } })
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

// Create new shortlist startup
exports.createShortlistStartup = (req, res) => {
  
  if(req.body.IsLike) {
  // Create a InvestorProfile
    const investorPreferenceModel = {
       InvestorProfileId: req.profileId,
        StartupProfileId: req.body.StartupId,
        CreatedDate: new Date(),
        UpdatedDate: new Date(),
        CreatedBy: req.body.CreatedBy,
        UpdatedBy: req.body.UpdatedBy
    };
    investorpreference.findOne({where:{InvestorProfileId:req.profileId,StartupProfileId:req.body.StartupId}})
    .then(data=>{
      if(data!=null){
        res.status(200).send({
          status:true,
          message:'Startup already shortlisted!',
          data:{
            profile:data
        }
      })
      }
      else{
        investorpreference.create(investorPreferenceModel)
        .then(response  => {
              res.status(200).send({
                status:true,
                message:'Startup shortlisted successfully!',
                data:{
                  profile:response
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
      }
     
    
    })  
  }
  else {
    investorpreference.destroy({
      where: { 
        InvestorProfileId: req.profileId,
        StartupProfileId: req.body.StartupId
       }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            status:true,
            message: "Shortlisted startup was deleted successfully!",
            data:{}
          });
        } else {
          res.send({
            status:false,
            message: `Cannot delete Preference with id=${id}. Maybe Preference was not found!`,
            data:{}
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Could not delete Preference with id=" + id,
          data:{}
        });
      });
  }
};

// Delete a :Shortlist startup with the specified id in the request
exports.deleteShortlistStartup = (req, res) => {
  const id = req.params.id;  
};

exports.investedstartuplist = (req,res)=>{
  var perPage = req.body.pagesize;
  var page = req.body.pagenumber;
  investment.findAll({include: [startupprofile],where:{InvestorProfileId :req.profileId}})
  .then(investments=>{
    var selectedInvestments = investments.slice((page-1)*perPage,page*perPage);
    var lst = [];
    var totalCount = Math.ceil(investments.length/perPage);
    selectedInvestments.forEach(element => {
      var response= {
      Id:element.StartupProfile.Id,
      StartupName:element.StartupProfile.StartupName,
      RaisingFunds:changeAmountValue(element.RaisingFunds),
      OfferedStake:element.StartupProfile.OfferedStake,
      ProductDescription:element.StartupProfile.ProductDescription,
      Website:element.StartupProfile.Website,
      Status:"In-Process",//element.StartupProfile.Status,
      DeckURL:element.StartupProfile.DeckURL,
      CurrentState:element.StartupProfile.CurrentState,
      StateDetail:element.StartupProfile.StateDetail,
      InitialEvaluation:element.StartupProfile.InitialEvaluation,
      StartUpCurrentEvaluation:element.StartupProfile.CurrentEvaluation,
      UserId:element.StartupProfile.UserId,
      StartupFounders: element.StartupProfile.startupfounder,
      Logo:"",
      Category:"",
      Stake :element.Stake,
      InvestorCurrentEvaluation :element.CurrentEvaluation ,
      IsLike:false
      };
      lst.push(response);
    })
    res.send({
      status:true,
        data:{
          startups:lst,
          pagenumber: req.body.pagenumber,
          pagesize: req.body.pagesize,
          totalcount: totalCount
        }
    });    
  })
}

exports.findAllAvaillableProfile = (req, res) => {
  var perPage = req.body.pagesize;
  var page = req.body.pagenumber;
  startupprofile.findAll({include: [startupfounder,User], where: {Status: 1}})
  .then(data => {
    var totalCount = Math.ceil(data.length/perPage);
    var availableStartups = data.slice((page-1)*perPage,page*perPage);
    var lst = [];
    availableStartups.forEach(element => {
      var response= {
        id:element.Id,
      StartupName:element.StartupName,
      RaisingFunds:changeAmountValue(element.RaisingFunds),
      OfferedStake:element.OfferedStake,
      ProductDescription:element.ProductDescription,
      Website:element.Website,
      Status:"In-Process",//element.Status,
      DeckURL:element.DeckURL,
      CurrentState:element.CurrentState,
      StateDetail:element.StateDetail,
      InitialEvaluation:changeAmountValue(element.InitialEvaluation),
      StartUpCurrentEvaluation:changeAmountValue(element.CurrentEvaluation),
      UserId:element.User.Id,
      StartupFounders: element.StartupFounders,
      Logo:element.Logo,
      Category:"",
      Stake :"",
      InvestorCurrentEvaluation :"",
      IsLike:false
      };
      lst.push(response);
    });    
      res.send({
        status:true,
          data:{
            startups:lst,
            pagenumber: req.body.pagenumber,
            pagesize: req.body.pagesize,
            totalcount: totalCount
          }
      });
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
// Retrieve all profiles shortlisted by prefrence from the database.
exports.findAllByShortlistedPrefrence = (req, res) => {
  const id = req.userId;
  var perPage = req.body.pagesize;
  var page = req.body.pagenumber;
  investorpreference.findAll({where : {InvestorProfileId : req.profileId}, include: [startupprofile]})
    .then(data => {
      var totalCount = Math.ceil(data.length/perPage);
      var lst = [];
      var availableStartups = data.slice((page-1)*perPage,page*perPage);
      availableStartups.forEach(element => {
        var response= {
          id:element.StartupProfile.Id,
          StartupName:element.StartupProfile.StartupName,
          RaisingFunds:changeAmountValue(element.RaisingFunds),
          OfferedStake:element.StartupProfile.OfferedStake,
          ProductDescription:element.StartupProfile.ProductDescription,
          Website:element.StartupProfile.Website,
          Status: "In-Progress",//element.StartupProfile.Status,
          DeckURL:element.StartupProfile.DeckURL,
          CurrentState:element.StartupProfile.CurrentState,
          StateDetail:element.StartupProfile.StateDetail,
          InitialEvaluation:changeAmountValue(element.StartupProfile.InitialEvaluation),
          StartUpCurrentEvaluation:changeAmountValue(element.StartupProfile.CurrentEvaluation),
          UserId:element.StartupProfile.UserId,
          StartupFounders: element.StartupProfile.startupfounder,
        Logo:element.StartupProfile.Logo,
        Category:"",
        Stake :0,
        InvestorCurrentEvaluation :0,
        IsLike:true
        };
        lst.push(response);
      });    
        res.send({
          status:true,
            data:{
              startups:lst,
              pagenumber: req.body.pagenumber,
              pagesize: req.body.pagesize,
              totalcount: totalCount
            }
        });
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

exports.startupProfile=(req,res)=>{
  const id= req.params.startupProfileId;
var message = "Under valuation";
var link = "";
var statusCode = 1
  startupprofile.findByPk(id,{include:[StartupFounder]})
  .then(element => {
    investorpreference.findOne({where : {InvestorProfileId : req.profileId, StartupProfileId:id}, include: [startupprofile]})
    .then(data => {
      event.findOne({where:{StartupProfileId:id,IsActive:1}})
      .then(startupEvent => {

        if(startupEvent!=null&&startupEvent.State==0)
          {message = "Founder's call";
          link = startupEvent.EventDate;
          statusCode = 2}
        else if(startupEvent!=null&&startupEvent.State==1)
        {
          message ="Join now";      
          link = startupEvent.CallLink;
          statusCode = 3;
        }
        else if(startupEvent!=null&&startupEvent.State==3)
        {
          message ="View recording";
          link = startupEvent.RecordingURL;
          statusCode = 4;
        }
        else if(startupEvent!=null&&startupEvent.State==4)
        {
          message ="Initial commit starts"
          link = startupEvent.CallForMoneyStartTime
          statusCode = 5;

        }
        else if(startupEvent!=null&&startupEvent.State==5)
        {
          message ="Commit now"
          statusCode = 6;

        }
        else if(startupEvent!=null&&startupEvent.State==6)
        {
          message ="Call for money ended"
          statusCode = 7;

        }
        else if(startupEvent!=null)
        {message = "Call For Money Ended"}

      var response= {
        id:element.Id,
        StartupName:element.StartupName,
        RaisingFunds:changeAmountValue(element.RaisingFunds),
        OfferedStake:element.OfferedStake,
        ProductDescription:element.ProductDescription,
        Website:element.Website,
        Status:"In-Process",//element.Status,
        DeckURL:element.DeckURL,
        CurrentState:element.CurrentState,
        StateDetail:element.StateDetail,
        InitialEvaluation:changeAmountValue(element.InitialEvaluation),
        CurrentEvaluation:changeAmountValue(element.CurrentEvaluation),
        UserId:element.UserId,
        StartupFounders: element.StartupFounders,
        Logo:element.Logo,
        Category:"",
        Stake :0,
        InvestorCurrentEvaluation :0,
        IsLike:data != null?true:false,
        EventMessage:message,
        EventLink:link,
        EventsStatusCode:statusCode
      };   
      res.send({
        status:true,
          data:{
            startup:response
          }
      });
    })
    });
  })
  .catch(err => {
    res.status(200).send({
      status:false,
      message:
        err.message || "Some error occurred while retrieving profiles.",
        data:{}
    });
  });  
}

//Retrive investment by profileid
exports.findInvestment = (req,res) =>{
  const id = req.profileId
  investment.findAll({ where: { InvestorProfileId: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error retrieving Investment with id=" + id,
        data:{}
      });
    });
};

//Retrive query by investor
exports.findQuery = (res,req) =>{
  const id = req.profileId
Query.findOne({where:{QueryBy:id}})
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


