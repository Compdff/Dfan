const { Query } = require("pg");
const db = require("../models");
const queryModel = require("../models/query.model");
const query = db.query;
const investorprofile = db.investorprofile;
const startupprofile = db.startupprofile;
const User = db.user;



// Retrive all query by startup id for investor user
exports.findAll = (req, res) => {
  const investorId = req.profileId;
  var result = {
    pastQuery:[],
    otherQuery:[]
  }
    query.findAll({
        where: {
          StartupProfileId: req.params.startupid
          }
    })
      .then(data => {

          data.filter(x=>x.QueryBy==investorId).forEach(element => {
            var response= {
          Id:element.Id,
           StartupProfileId: element.StartupProfileId,
           Question:element.Question,
           QueryBy:element.QueryBy,
           Comment :element.Comment,
           Status :element.Status,
           AttachDoc:element.AttachDoc
            };
            result.pastQuery.push(response);
          }); 
          data.filter(x=>x.QueryBy!=investorId).forEach(element => {
            var response= {
          Id:element.Id,
           StartupProfileId: element.StartupProfileId,
           Question:element.Question,
           QueryBy:element.QueryBy,
           Comment :element.Comment,
           Status :element.Status,
           AttachDoc:element.AttachDoc
            };
            result.otherQuery.push(response);
          }); 
        
        if(result!=null){
          res.status(200).send({
            status:true,
            data:result
          });
        }
        else{
          res.status(200).send({
            status:false,
            message: "No Query was found with StartupProfileId=" + req.params.startupid,
            data:{}
          });
        }
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

  // Retrive all query by startup id for startup user
exports.findQueries = (req, res) => {
  const startupId = req.profileId;
  var result = {
    answered:[],
    pending:[]
  }
    query.findAll({
        where: {
          StartupProfileId: startupId
          }
    })
      .then(data => {

          data.filter(x=>x.Status==1).forEach(element => {
            var response= {
          Id:element.Id,
           StartupProfileId: element.StartupProfileId,
           Question:element.Question,
           QueryBy:element.QueryBy,
           Comment :element.Comment,
           Status :element.Status,
           AttachDoc:element.AttachDoc
            };
            result.answered.push(response);
          }); 
          data.filter(x=>x.Status==0).forEach(element => {
            var response= {
          Id:element.Id,
           StartupProfileId: element.StartupProfileId,
           Question:element.Question,
           QueryBy:element.QueryBy,
           Comment :element.Comment,
           Status :element.Status,
           AttachDoc:element.AttachDoc
            };
            result.pending.push(response);
          }); 
        
        if(result!=null){
          res.status(200).send({
            status:true,
            data:result
          });
        }
        else{
          res.status(200).send({
            status:false,
            message: "No Query was found with StartupProfileId=" + req.params.startupid,
            data:{}
          });
        }
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


  // Retrive all query for admin
exports.findAllQuery = (req, res) => {
  const startupId = req.params.startupid;
  var result =[];
    query.findAll(
      { where:{StartupProfileId:startupId},
        include: [{
        model: investorprofile,         
        attributes:["CompanyName","CompanyName","Id","Id"],
        include:User
        },{
            model: startupprofile,
            attributes:["StartupName","StartupName","Id","Id"]  
        }] 
    })
      .then(data => {

          data.forEach(element => {
            var response= {
          Id:element.Id,
           StartupProfileId: element.StartupProfileId,
           StartupName:element.StartupProfile.StartupName,
           Question:element.Question,
           QueryBy:element.InvestorProfile.User.Name,
           Comment :element.Comment,
           Status :element.Status,
           AttachDoc:element.AttachDoc,
           CreatedDate:element.createdAt
            };
            result.push(response);
          }); 
          
        
        if(result.length>0){
          res.status(200).send({
            status:true,
            data:result
          });
        }
        else{
          res.status(200).send({
            status:false,
            message: "No Query was found with StartupProfileId=" + req.params.startupid,
            data:{}
          });
        }
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

  // Create and Save a new Profile
exports.create = (req, res) => {
  // Create a InvestorProfile
  const queryModel = {
      StartupProfileId:req.body.StartupProfileId,
      Question:req.body.Question,
      QueryBy:req.profileId, 
      Status: 0, 
      CreatedDate:new Date(),  
      UpdatedDate:new Date()  
  };

  query.create(queryModel)
  .then(query  => {
    res.status(200).send({
      status:true,
      message:'Query created successfully!',
      data:{
        query:query
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

// Update a Query by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const queryRequest = {
    Status: 1,
    Comment:req.body.Comment, 
    AttachDoc:req.body.AttachDoc, 

  }

  query.update(queryRequest, {
    where: { Id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "Query was updated successfully.",
          data:{       
          }
        });
      } else {
        res.status(200).send({
          status:false,
          message: `Cannot update Query with id=${id}. May be Query was not found or req.body is empty!`,
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

// Retrive all query by qureryBy(invester)
exports.findAllByInvester = (req, res) => {
  
  query.findAll({
      where: {
        QueryBy: req.params.investerid
        }
  })
    .then(data => {
      if(data.length !=0){
        res.send(data);
      }
      else{
        res.status(200).send({
          status:false,
          message: "No Query was found with QueryBy=" + req.params.investerid,
          data:{}
        });
      }
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

// Find a single query with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  query.findByPk(id)
    .then(data => {
      if(data){
        res.send(data);
      }
      else{
        res.status(200).send({
          status:false,
          message: "Query was not found with id=" + id,
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
