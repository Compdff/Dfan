const accountSid = "ACf5e825efa24bb2c668868acd7f583440";
const authToken = "204e1c0e3e561f51ea60ad5daf62a01a";
const client = require('twilio')(accountSid, authToken);
const otpGenerator = require('otp-generator')



exports.create = (req,res) =>{
  //const otp =   '12345'//otpGenerator.generate(4, { upperCase: false,alphabets: false, specialChars: false ,digits:true});
    res.status(200).send({
        status: true,
        message: "otp send",
        data: {
            OTP: 1234
        }
    })
//client.messages
//  .create({
//     body: 'Your OTP is '+otp,
//     from: '+17604725588',
//     to: req.body.MobileNumber
//   })
//  .then(message => 
//    res.status(200).send({
//        status:true,
//        message:"otp send",
//        data:{
//            MessageSID : message.sid,
//            OTP : otp
//        }
//      })
//  )
  .catch(err => {
        res.status(200).send({
          status:false,
          message:
            err.message || "Some error occurred .",
            data:{}
        });
      });
};

exports.findAllCountry = (req,res) =>{
  const otp =   '12345'//otpGenerator.generate(4, { upperCase: false,alphabets: false, specialChars: false ,digits:true});


    res.status(200).send({
        status:true,
        message:"otp send",
        data:{
            MessageSID : message.sid,
            OTP : otp
        }
      })
  
};
