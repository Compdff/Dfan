const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const Investorprofile = db.investorprofile;
const StartupProfile = db.startupprofile;
const otpGenerator = require('otp-generator')
const Membership = db.membership;
const Investment = db.investment;
const nodemailer = require('nodemailer');
const userRole = db.u
const sendmail = require('sendmail')();
const appconfig= require("../config/app.config.js")



var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { isModerator } = require("../middleware/authJwt");
const { user } = require("../models");
const { Start } = require("twilio/lib/twiml/VoiceResponse");
// Create and Save a new Account
exports.create = (req, res) => {
  
    // Create a User
    const userModel = {
        Id:req.body.id,
        UserName: req.body.username,
        MobileNo: req.body.mobileno,
        Name: req.body.name,
        Password: bcrypt.hashSync(req.body.password, 8),
        DeviceToken: req.body.devicetoken,
        DeviceType:req.body.devicetype,
        IsProfileCreated:false,
        Createddate: new Date(),
        Updateddate: new Date(),
        Status:0,
        ReferralCode:otpGenerator.generate(6, { upperCase: false, specialChars: false})
    };
  
    // Save User in the database
    User.create(userModel)
      .then(user  => {
        if (req.body.role) {
          Role.findAll({
            where: {
              Name:  req.body.role
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              var role = '';
              user.getRoles().then(roles => {
                var role ='';
              if(roles != null && roles.length>0){
                role=roles[0].Name.toLowerCase(); 
              }  
              if(role == "investor"){
                var obj ={
                  RoleId : 1
                }
                User.update(obj,{where:{Id:user.Id}})
                .then(result=>{
                Investorprofile.findOne({
                where: {
                  UserId: user.Id
                }
              }).then(investorProfile=>{
                var token = jwt.sign({ id: user.Id ,profileId: 6}, config.secret, {
                  expiresIn: '365d' // 24 hours
                });
                user = user.toJSON();
                user.InvestedStartups = 0;
                res.status(200).send({
                  status:true,
                  message:'User created successfully!',
                  data:{
                    user:user,
                    role:role,
                    accessToken: token
                  }
                });
              })
            })
              }
              else if(role =="startup"){
                var obj ={
                  RoleId : 2
                }
                User.update(obj,{where:{Id:user.Id}})
                .then(result=>{
                 StartupProfile.findOne({
                  where: {
                    UserId: user.Id
                  }
                }).then(startupProfile=>{           
                  var token = jwt.sign({ id: user.Id, profileId:  3}, config.secret, {
                    expiresIn: '365d' // 24 hours
                  });
          
                  res.status(200).send({
                    status:true,
                    message:'User created successfully!',
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
                var obj ={
                  RoleId : 3
                }
                User.update(obj,{where:{Id:user.Id}})
                .then(result=>{
                var token = jwt.sign({ id: user.Id, profileId: 0 }, config.secret, {
                  expiresIn: 86400 // 24 hours
                });
        
                res.status(200).send({
                  status:true,
                  message:'User created successfully!',
                  data:{
                    user:user,
                    role:role,
                    accessToken: token
                  }
                });
              })
              }
              });
            });
            
          });
          
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            user.getRoles().then(roles => {
              var role ='';
              if(roles != null && roles.length>0){
                role=roles[0].Name.toLowerCase(); 
              }  
              if(role == "investor"){
                Investorprofile.findOne({
                where: {
                  UserId: user.Id
                }
              }).then(investorProfile=>{
                var token = jwt.sign({ id: user.Id ,profileId: investorProfile.Id}, config.secret, {
                  expiresIn: '365d' // 24 hours
                });
        
                res.status(200).send({
                  status:true,
                  message:'User created successfully!',
                  data:{
                    user:user,
                    role:role,
                    accessToken: token
                  }
                });
              })
              }
              else if(role =="startup"){
                 StartupProfile.findOne({
                  where: {
                    UserId: user.Id
                  }
                }).then(startupProfile=>{           
                  var token = jwt.sign({ id: user.Id, profileId: startupProfile.Id }, config.secret, {
                    expiresIn: '365d' // 24 hours
                  });
          
                  res.status(200).send({
                    status:true,
                    message:'User created successfully!',
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
        
                res.status(200).send({
                  status:true,
                  message:'User created successfully!',
                  data:{
                    user:user,
                    role:role,
                    accessToken: token
                  }
                });
              }
            });
          });
        }
        // res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message:
            err.message || "Some error occurred while creating the Tutorial.",
            data:{}
        });
      });
  };

// Retrieve all admin Users from the database.
 exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    User.findAll({where:{RoleId:3}})
    .then(data=>{
      res.send(data);
    })
      .catch(err => {
        res.status(200).send({
          status:false,
          message:
            err.message || "Some error occurred while retrieving users.",
            data:{}
        });
      });
  };

  exports.googleRegister = (req, res) => {
  
    // Create a User
    const userModel = {
        UserName: req.body.username,
        Name: req.body.name,
        Status: req.body.status,
        GoogleKey: req.body.googlekey,
        DeviceToken: req.body.devicetoken,
        DeviceType:req.body.devicetype,
        IsProfileCreated:false,
        createddate: new Date(),
        updateddate: new Date(),
        SocialId:req.body.social_id,
        SocialType:req.body.social_type
    };
    User.findOne({
      where: {
        UserName: req.body.username
      }
    }).then(user => {
      if(user && user.GoogleKey){      
        var authorities = [];
        user.getRoles().then(roles => {
        var role ='';
              if(roles != null && roles.length>0){
                role=roles[0].Name.toLowerCase(); 
              }  
              if(role == "investor"){
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
                        expiresIn: 86400 // 24 hours
                      });
                      user = user.toJSON();
                      user.InvestedStartups = investments!=null? investments.length:0;
              
                      res.status(200).send({
                        status:true,
                        message:'User created successfully!',
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
                  expiresIn: 86400 // 24 hours
                });
                user = user.toJSON();
                user.InvestedStartups = 0;
                res.status(200).send({
                  status:true,
                  message:'User created successfully!',
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
                }).then(startupProfile=>{   
                  var profileID = 0;
                if(startupProfile!=null){
                  profileID = startupProfile.Id
                }        
                  var token = jwt.sign({ id: user.Id, profileId: profileID }, config.secret, {
                    expiresIn: 86400 // 24 hours
                  });
          
                  res.status(200).send({
                    status:true,
                    message:'User created successfully!',
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
                  expiresIn: 86400 // 24 hours
                });
        
                res.status(200).send({
                  status:true,
                  message:'User created successfully!',
                  data:{
                    user:user,
                    role:role,
                    accessToken: token
                  }
                });
              }
      });
      }
      else{
        User.create(userModel)
        .then(user  => {
                var token = jwt.sign({ id: user.Id, profileId: 0 }, config.secret, {
                  expiresIn: 86400 // 24 hours
                });
        
                res.status(200).send({
                  status:true,
                  message:'User created successfully!',
                  data:{
                    user:user,
                    accessToken: token
                  }
                });
              })
        .catch(err => {
          res.status(200).send({
            status:false,
            message:
              err.message || "Some error occurred while creating the Tutorial.",
              data:{}
          });
        });
      }
    })
    // Save User in the database
   
  };
// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.userId;
  
    User.findByPk(id)
      .then(data => {
        data.getRoles().then(roles => {
          var role ='';
          if(roles != null && roles.length>0){
            role=roles[0].Name.toLowerCase(); 
          }  
        if(role=="investor"){
          Investorprofile.findOne({where:{UserId:data.Id}})
          .then(investorProfile=>{
            Investment.findAll({where:{InvestorProfileId:investorProfile.Id}})
            .then(investment=>{
              Membership.findOne({
                where:{UserId:data.Id} })
            .then(membership => {
              var isReminder = false;
              if(membership){
                 todaysDate = new Date();
                 reminderDate = new Date();
                 reminderDate.setDate(membership.ReminderUpdateDate.getDate() + membership.Reminder);   
                if(todaysDate.getDate()==reminderDate.getDate()){
                  isReminder = true;
                }
              }
              data = data.toJSON();
                data.IsReminder = isReminder;
                data.InvestedStartups = investment!=null?investment.length:0;
                res.status(200).send({
                  status:true,
                  data:{
                    user:data,
                  }
                });
            })
            })
            
          })
         
    }
    else if(role=="startup"){
      StartupProfile.findOne({where:{UserId:data.Id}})
          .then(startupProfile=>{
      Membership.findOne({
        where:{UserId:data.Id} })
    .then(membership => {
      var isReminder = false;
      if(membership){
         todaysDate = new Date();
         reminderDate = new Date();
         reminderDate.setDate(membership.ReminderUpdateDate.getDate() + membership.Reminder);   
        if(todaysDate.getDate()==reminderDate.getDate()){
          isReminder = true;
        }
      }
      data = data.toJSON();
        data.IsReminder = isReminder;
        data.currentState = startupProfile.CurrentState;
        data.startupName =startupProfile.StartupName;
        res.status(200).send({
          status:true,
          data:{
            user:data,
          }
        });
    })
  })

    }
    else{
      Membership.findOne({
        where:{UserId:data.Id} })
    .then(membership => {
      var isReminder = false;
      if(membership){
         todaysDate = new Date();
         reminderDate = new Date();
         reminderDate.setDate(membership.ReminderUpdateDate.getDate() + membership.Reminder);   
        if(todaysDate.getDate()==reminderDate.getDate()){
          isReminder = true;
        }
      }
      data = data.toJSON();
        data.IsReminder = isReminder;
        res.status(200).send({
          status:true,
          data:{
            user:data,
          }
        });
    })

    }
  })
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error retrieving User with id=" + id,
          data:{}
        });
      });
  };

  // Find a single User with an id for admin
exports.findOneById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      data.getRoles().then(roles => {
        var role ='';
        if(roles != null && roles.length>0){
          role=roles[0].Name.toLowerCase(); 
        }  
      if(role=="investor"){
        Investorprofile.findOne({where:{UserId:data.Id}})
        .then(investorProfile=>{
          Investment.findAll({where:{InvestorProfileId:investorProfile.Id}})
          .then(investment=>{
            Membership.findOne({
              where:{UserId:data.Id} })
          .then(membership => {
            var isReminder = false;
            if(membership){
               todaysDate = new Date();
               reminderDate = new Date();
               reminderDate.setDate(membership.ReminderUpdateDate.getDate() + membership.Reminder);   
              if(todaysDate.getDate()==reminderDate.getDate()){
                isReminder = true;
              }
            }
            data = data.toJSON();
              data.IsReminder = isReminder;
              data.InvestedStartup = investment!=null?investment.length:0;
              res.status(200).send({
                status:true,
                data:{
                  user:data,
                }
              });
          })
          })
          
        })
       
  }
  else{
    Membership.findOne({
      where:{UserId:data.Id} })
  .then(membership => {
    var isReminder = false;
    if(membership){
       todaysDate = new Date();
       reminderDate = new Date();
       reminderDate.setDate(membership.ReminderUpdateDate.getDate() + membership.Reminder);   
      if(todaysDate.getDate()==reminderDate.getDate()){
        isReminder = true;
      }
    }
    data = data.toJSON();
      data.IsReminder = isReminder;
      res.status(200).send({
        status:true,
        data:{
          user:data,
        }
      });
  })
  }
})
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error retrieving User with id=" + id,
        data:{}
      });
    });
};

  exports.findByEmail = (req, res) => {
    User.findOne({
      where: {
        UserName: req.params.username
      }
    })
      .then(data => {
        if(data){
          res.send({
            status:true,
            message:'User Exist!',
          });
        }
        else{
          res.status(200).send({
            status:false,
            message: "User does not exist with username = " + req.params.username,
            data:{}
          });
        }        
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "User does not exist with username=" + req.params.username,
          data:{}
        });
      });
  };
// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    if(req.body.role){
      User.findByPk(id)
      .then(user =>{
        Role.findAll({
          where: {
            Name:  req.body.role
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
          
            var role ='';
                if(roles != null && roles.length>0){
                  role=roles[0].Name.toLowerCase(); 
                }  
            res.status(200).send({
              status:true,
              message:'User updated successfully!',
              data:{
                user:user,
                role:role,
              }
            });
          });
        });
      })
       
      }
      else{
  
    User.update(req.body, {
      where: { Id: id }
    })
      .then(num => {
        if (num == 1) {
         
            
          User.findByPk(id).then(userData => {
            userData.getRoles().then(roles => {
              var role ='';
              if(roles != null && roles.length>0){
                role=roles[0].Name.toLowerCase(); 
              }  
            if(role == "investor"){
              Investorprofile.findOne({
                where: {
                  UserId: userData.Id
                }
              })
              .then(investorProfile=>{
                if(investorProfile!=null){
                 Investment.findAll({where:{InvestorProfileId:investorProfile.Id}})
                 .then(investments => {
                  userData = userData.toJSON();
                  userData.InvestedStartups = investments!=null? investments.length:0;
                 res.status(200).send({
                  status:true,
                  message:'Account was updated successfully.',
                  data:{
                  user:userData,
                  role:role}
                  });
               
                })
              }
              else{
                userData = userData.toJSON();
                  userData.InvestedStartups = 0;
                 res.status(200).send({
                  status:true,
                  message:'Account was updated successfully.',
                  data:{
                  user:userData,
                  role:role}
                  });

              }
              })
              
            }
            else if(role == "startup"){
              StartupProfile.findOne({
                where: {
                  UserId: userData.Id
                }
              })
              .then(startupProfile=>{
                userData = userData.toJSON();
                userData.logo = startupProfile.Logo;
                userData.startupName = startupProfile.StartupName;
                userData.currentState = startupProfile.CurrentState;
                res.status(200).send({
                  status:true,
                  message:'Account was updated successfully.',
                  data:{
                    user:userData,
                    role:role
                  }
              });
              })
            }
            else{
              res.status(200).send({
                status:true,
                message:'Account was updated successfully.',
                data:{
                  user:userData,
                  role:role
                }
            });
            }

         
      });
     
      });

        } else {
          res.status(200).send({
            status:false,
            message: `Cannot update account with id=${id}. Maybe account was not found or req.body is empty!`,
            data:{}
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error updating Account with id=" + id,
          data:{}
        });
      });
    }
  };

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { Id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            status:true,
            message: "User was deleted successfully!",
            data:{}
          });
        } else {
          res.send({
            status:false,
            message: `Cannot delete User with id=${id}. Maybe Account was not found!`,
            data:{}
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Could not delete User with id=" + id,
          data:{}
        });
      });
  };

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        status:true,
         message: `${nums} Users were deleted successfully!`,
        data:{} 
      });
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message:
          err.message || "Some error occurred while removing all Users.",
          data:{}
      });
    });
};

// Find all Users with condition
exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message:
            err.message || "Some error occurred while retrieving User.",
            data:{}
        });
      });
  };
  
  exports.ChangePassword = (req, res) => {
    const Id = req.userId;
  User.findOne({
      where: {
        Id: Id
      }
    })
      .then(user => {
        if (!user) {
          return res.status(200).send({ status:false, message: "User does not found." ,data:{}});
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.Oldpassword,
          user.Password
        );
        if (!passwordIsValid) {
          return res.status(200).send({
           data: {accessToken: null},
            message: "Invalid Password!",
            status:false,
          });
        }else{
          const hashPassword = bcrypt.hashSync(req.body.Password, 8);
          req.body.Password=hashPassword;
          User.update(req.body ,{
            where: { Id: Id }
          })
          return res.status(200).send({
            data: {},
             message: "Pasassword changed successfully!",
             status:true,
           });
        }
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error updating password with id=" + Id,
          data:{}
        });
      });
  };
  // exports.test = (req, res) => {
  //   var FCM = require('fcm-node');
  //   var serverKey = 'AAAAjdMXU5Y:APA91bGO_sI7n4EJfshmm202jzM-RWxahbhSM4M5rtXFEgjFa1xubsxgJirIA7_ol6KptkVuQPLolLf6C7HKHnzvqiv0Q-2OCLN3ahu0mmO2X93pyzZaEHOQf3gKGBdIPKTBqZ8k1tab'; //put your server key here
  //   var fcm = new FCM(serverKey);

  //   var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  //       to: 'registration_token', 
  //       notification: {
  //           title: 'Title of your push notification', 
  //           body: 'Body of your push notification' 
  //       },
        
  //       data: {  //you can send only notification or only data(or include both)
  //           my_key: 'my value',
  //           my_another_key: 'my another value'
  //       }
  //   };
    
  //   fcm.send(message, function(err, response){
  //       if (err) {
  //           console.log(err);
  //       } else {
  //           console.log("Successfully sent with response: ", response);
  //       }
  //   });
  // };

  exports.test = (req, res) => {
    var FCM = require('fcm-node');
    var serverKey = 'AAAAjdMXU5Y:APA91bG7n4EJfshmm202jzM-RWxahbhSM4M5rtXFEgjFa1xubsxgJirIA7_ol6KptkVuQPLolLf6C7HKHnzvqiv0Q-2OCLN3ahu0mmO2X93pyzZaEHOQf3gKGBdIPKTBqZ8k1tab'; //put your server key here
    var fcm = new FCM(serverKey);

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'cyP3JytWDcBBE25S6gE6se:APA91bGHNnQeGfOlVsG90ZqP0KyZCDYxiD-e30Fz6CoxoT0rrTxwXSe2CypKHs-bCMHnx8pY3YaupD6qYYLH7T2OBldDVn1K3gjTcgZftUpI6jBMlRarH20WS7fHKnxEE0DHXkAnP5dj', 
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
  };

  // exports.notification = () =>{

  // }


  exports.forgetPassword = (req,res) =>{
    User.findOne({where:{UserName:req.body.username}})
    .then(data=>{
      var password = otpGenerator.generate(6, { upperCase: true, specialChars: true})
      passwordHash = bcrypt.hashSync(password, 8);
      const obj = {
        Password:passwordHash
      }

      User.update(obj,{where:{Id:data.Id}})
      .then(user=>{ 

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: appconfig.SENDERS_EMAIL,
            pass: appconfig.SENDERS_EMAIL_PASSWORD
          },
          });

          let mailOptions = {
            from: appconfig.SENDERS_EMAIL,
            to: data.UserName,
            subject: "Passwort reset",
            text: "Your password is "+password
            };

            transporter.sendMail(mailOptions, (error, response) => {
              if (error) {
                res.status(200).send({
                  data: {},
                   message: error,
                   status:false,
                 });
              }
              res.status(200).send({
                data: {},
                 message: "Password sent to the mail.",
                 status:true,
               });
              });

      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error updating password with username=" + req.body.username,
          data:{err}
        });
      })


    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error updating password with username=" + req.body.username,
        data:{err}
      });
    });
  }

   adminUsers = (user,res) => {
    
        user.getRoles()
        .then(roles =>{
        var role ='';
        role=roles[0].Name.toLowerCase(); 
      if(role=='investor'){
        res.send(true);
      }
      res.send(false);
    })
    .catch(err => {
      res.send( err.message );
      
    });
  };
