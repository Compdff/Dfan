module.exports = app => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
      const controller = require("../controllers/referral.controller");
      const { authJwt } = require("../middleware");
      var router = require("express").Router();
  
      // Retrieve all referrals by investor id from token
      router.get("/", [authJwt.verifyToken],controller.findAll)

       // Retrieve all Referrals by admin
       router.get("/investor/:profileId", [authJwt.verifyToken],controller.findAllReferrals)

    

      app.use('/api/referral', router);
  
  };