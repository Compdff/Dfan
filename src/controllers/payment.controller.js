const db = require("../models");
const Payment = db.payment;
const Membership = db.membership;
const User = db.user;
const InvestorProfile = db.investorprofile;



   // Create and Save a new Payment
exports.create = (req, res) => {
    const payment = {
        PaymentDate:req.body.PaymentDate,
        Status:req.body.Status,
        UserId:req.userId,
        Amount:req.body.Amount,
        TransactionKey:req.body.TransactionKey,
        ReturnObject:req.body.ReturnObject
    }
  
    Payment.create(payment)
    .then(result  => {
      res.status(200).send({
        status:true,
        message:'Payment created successfully!',
        data:{
            payment:result
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


exports.findAll = (req, res) => {
    const resultData = {
        StartDate:new Date(),
        EndDate:new Date(),
        UserName:"",
        Payments:[]
    }
  InvestorProfile.findByPk(req.params.profileId)
  .then(data => {
      if(data){
    User.findByPk(data.UserId)
    .then(user =>{
   
      Membership.findOne(
          {
              where:{UserId:user.Id}
          }       
      )
      .then(membership => {
          if(membership){
          Payment.findAll({where:{UserId:membership.UserId}})
          .then(data => {
            if(data){
              resultData.StartDate = membership.StartDate;
              resultData.EndDate = membership.EndDate;
              resultData.UserName = user.Name;
              resultData.Payments = data;          
              
              res.send(resultData);
            }
            else{
              res.status(200).send({
                status:false,
                message: "Payment was not found with id=" + req.params.userId,
                data:{}
              });
            }
            
          })
      }
      else{
          res.status(200).send({
              status:false,
              message: "Membership was not found with id=" + req.params.userId,
              data:{}
            });
      }
      })
    })
}
else{
    res.status(200).send({
        status:false,
        message: "Invalid profileid id=" + req.params.userId,
        data:{}
      });
}
  })
 
     .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error retrieving Profile with id=" + req.params.userId,
          data:{}
        });
      });
  };
