const db = require("../models");
const Referral = db.referral;
const InvestorProfile = db.investorprofile;
const User = db.user



 


  

//   // Find a all referrals by investor id 
// exports.findAll = (req, res) => {
//   const id = req.profileId;
// var result = {
//     Points:0,
//     Referrals:[]
// };
//   Referral.findAll({where:{RefInvestorId:id},include:[InvestorProfile]})
//     .then(referrals => {
//       if(referrals){
//         referrals.forEach(element => {
//          User.findOne({where:{Id:element.InvestorProfile.UserId}})
//          .then(user => {
//              var ref={
//                  Name:user.Name,
//                  ProfileImage:user.ProfileImage,
//                  Date:element.CreatedDate

//              };
//              result.Referrals.push(ref);
//          })
         
//        })
//        result.Points = referrals.length*1000;

//         res.status(200).send({
//             status:true,
//             data:{result}
//          });  
//        }
//       else{
//         res.status(200).send({
//           status:false,
//           message: "Referral was not found with id=" + id,
//           data:{}
//         });
//       }
      
//     })
//     .catch(err => {
//       res.status(200).send({
//         status:false,
//         message: "Error retrieving data with id=" + id,
//         data:{}
//       });
//     });
// };

  // Find a all referrals by investor id 
 exports.findAll = (req, res) => {
    const id = req.profileId;
  var result = {
      Points:0,
      Referrals:null
  };
    Referral.findAll({where:{RefInvestorId:id},include:[
       {
            model: InvestorProfile, 
            include: [{
              model: User

            }]}
    ]})
      .then(referrals => {
        if(referrals){
         
         result.Points = referrals.length*1000
         result.Referrals = referrals
          res.status(200).send({
              status:true,
              data:{result}
           });  
         }
        else{
          res.status(200).send({
            status:false,
            message: "Referral was not found with id=" + id,
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

   // Find a all referrals by investor id 
 exports.findAllReferrals = (req, res) => {
    const id = req.params.profileId;
  var result = {
      Points:0,
      Referrals:null
  };
    Referral.findAll({where:{RefInvestorId:id},include:[
       {
            model: InvestorProfile, 
            include: [{
              model: User

            }]}
    ]})
      .then(referrals => {
        if(referrals){
         
         result.Points = referrals.length*1000
         result.Referrals=referrals
          res.status(200).send({
              status:true,
              data:{result}
           });  
         }
        else{
          res.status(200).send({
            status:false,
            message: "Referral was not found with id=" + id,
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



 