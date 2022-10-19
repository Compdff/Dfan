const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const StartupProfile = db.startupprofile;
const Investorprofile = db.investorprofile;
const Op = db.Sequelize.Op;
const Membership = db.membership;
const Investment = db.investment;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  const userModel = {
    DeviceToken:req.body.devicetoken,
    DeviceType:req.body.devicetype
  }
  
  User.findOne({
    where: {
      UserName: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({ status:false, message: "User Not found." ,data:{}});
      }
      User.update(userModel, {
        where: { Id: user.Id }
      })
      .then(num => {
        Membership.findOne({
          where:{UserId:user.Id}
              })
              .then(membership => {
                var passwordIsValid = bcrypt.compareSync(
                  req.body.password,
                  user.Password
                );
                var isReminder = false;
                if(membership){
                   todaysDate = new Date();
                   reminderDate = new Date();
                   reminderDate.setDate(membership.ReminderUpdateDate.getDate() + membership.Reminder);   
                  if(todaysDate.getDate()==reminderDate.getDate()){
                    isReminder = true;
                  }
                }
                if (!passwordIsValid) {
                  return res.status(200).send({
                   data: {accessToken: null},
                    message: "Invalid Password!",
                    status:false,
                  });
                }
           
                user.getRoles().then(roles => {
                  var role ='';
                  if(roles != null && roles.length>0){
                    role=roles[0].Name.toLowerCase(); 
                  }  
                  
                  if(role == "investor"){
                    var investedStartups = 0;
                    if(user.IsProfileCreated){
                      Investorprofile.findOne({
                        where: {
                          UserId: user.Id
                        }
                      }).then(investorProfile=>{
                        
                         var profileID = 0;
                        if(investorProfile!=null){
                          profileID = investorProfile.Id
                        }
                        Investment.findAll({where:{InvestorProfileId:investorProfile.Id}})
                        .then(investments=>{
                          var token = jwt.sign({ id: user.Id ,profileId: profileID}, config.secret, {
                            expiresIn: '365d' // 24 hours
                          });
                          
                          user = user.toJSON();
                          user.IsReminder = isReminder;
                          user.InvestedStartups = investments!=null? investments.length:0;
                          res.status(200).send({
                            status:true,
                            message:'You are successfully logged in',
                            data:{
                              user:user,
                              role:role,
                              accessToken: token
                            }
                          });
                        })
                       
                      })
                    }
                    else{
                    Investorprofile.findOne({
                    where: {
                      UserId: user.Id
                    }
                  }).then(investorProfile=>{
                     var profileID = 0;
                    if(investorProfile!=null){
                      profileID = investorProfile.Id
                    }
                    var token = jwt.sign({ id: user.Id ,profileId: profileID}, config.secret, {
                      expiresIn: '365d' // 24 hours
                    });
                    
                    user = user.toJSON();
                    user.IsReminder = isReminder;
                    user.InvestedStartups = 0;
                    res.status(200).send({
                      status:true,
                      message:'You are successfully logged in',
                      data:{
                        user:user,
                        role:role,
                        accessToken: token
                      }
                    });
                  })
                }
                  }
                  else if(role =="startup"){
                     StartupProfile.findOne({
                      where: {
                        UserId: user.Id
                      }
                    }).then(startupProfile=> {    
                      
                      var profileID = 0;
                      if(startupProfile!=null){
                        profileID = startupProfile.Id;
                        user = user.toJSON();
                       user.logo = startupProfile.Logo;
                        user.startupName = startupProfile.StartupName;
                       user.currentState = startupProfile.CurrentState;
                      }
                      var token = jwt.sign({ id: user.Id, profileId: profileID }, config.secret, {
                        expiresIn: '365d' // 24 hours
                      });
                      user.IsReminder = isReminder;
                      res.status(200).send({
                        status:true,
                        message:'You are successfully logged in',
                        data:{
                          user:user,                     
                          role:role,
                          accessToken: token
                        }
                      });
                    })
                  }
                  else{
                    var token = jwt.sign({ id: user.Id, profileId: 0 }, config.secret, {
                      expiresIn: '365d' // 24 hours
                    });
                    user = user.toJSON();
                    user.IsReminder = isReminder;
                    res.status(200).send({
                      status:true,
                      message:'You are successfully logged in',
                      data:{
                        user:user,
                        role:role,
                        accessToken: token
                      }
                    });
                  }
                });
              })
      })
    
    })
    .catch(err => {
      res.status(200).send({ status:false,message: err.message,data:{} });
    });
};