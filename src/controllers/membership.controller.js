const db = require("../models");
const membership = db.membership;
const jwt = require("jsonwebtoken");




 

// Create and Save a new Reminder
exports.createReminder = (req, res) => {
    
    const membershipModel = {
        UserId:req.userId,
        Reminder:req.body.Reminder,
        ReminderUpdateDate:new Date()
    };
  
    membership.findOne({
        where: {
          UserId: req.userId
        }
      })
      .then(data=>{
          if(data!=null)
          {
            membership.update(membershipModel, {
                where: { UserId:req.userId }
              })
            .then(data  => {
              res.status(200).send({
                status:true,
                message:'Reminder updated successfully!',
                data:{
                  membership:data
              }
            });
            })  
          }
          else{
            membership.create(membershipModel)
            .then(data  => {
              res.status(200).send({
                status:true,
                message:'Reminder created successfully!'               
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

  // Create and Save a new Reminder
exports.createMembership = (req, res) => {
    
    const membershipModel = {
        UserId:req.userId,
        Amount:req.body.Amount,
        StartDate:new Date(),
        EndDate:new Date()
    };

    membership.findOne({
        where: {
          UserId: req.userId
        }
      })
      .then(data=>{
          if(data!=null)
          {
              if(data.EndDate!=null)
            {
                if(data.EndDate>new Date())
                {
                    membershipModel.EndDate = data.EndDate;
                    membershipModel.EndDate.setDate(membershipModel.EndDate.getDate() + 365);   
                    membershipModel.StartDate = data.StartDate;
                }
                else{
                    membershipModel.StartDate = data.StartDate;
                    membershipModel.EndDate.setDate(membershipModel.EndDate.getDate() + 365);   
                }
            }
            else{
                membershipModel.StartDate = new Date();
                membershipModel.EndDate.setDate(new Date().getDate() + 365);
            }
            membership.update(membershipModel, {
                where: { UserId:req.userId }
              })
            .then(data  => {
              res.status(200).send({
                status:true,
                message:'Membership updated successfully!'
                
            });
            })  
          }
          else{
            membershipModel.StartDate=new Date()
            membershipModel.EndDate = date.setDate(membershipModel.EndDate.getDate() + 365);
            membership.create(membershipModel)
            .then(data  => {
              res.status(200).send({
                status:true,
                message:'Membership created successfully!'               
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

  

  // Find a single membership with an userid
exports.findOne = (req, res) => {
  const id = req.userId;

  membership.findOne({where:{UserId:id}})
    .then(data => {
      if(data){
        res.status(200).send({
            status:true,
            data:{data}
          });  
            }
      else{
        res.status(200).send({
          status:false,
          message: "Membership was not found with id=" + id,
          data:{}
        });
      }
      
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error retrieving data with id=" + id,
        data:{}
      });
    });
};



 