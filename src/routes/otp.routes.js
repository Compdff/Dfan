module.exports = app => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
      const controller = require("../controllers/otp.controller");
      const { authJwt } = require("../middleware");
      var router = require("express").Router();
  
      

      // Create a OTP
      router.post("/",[authJwt.verifyToken], controller.create);

      

      app.use('/api/otp', router);
  
  };