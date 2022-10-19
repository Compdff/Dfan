module.exports = app => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
      const controller = require("../controllers/payment.controller");
      const { authJwt } = require("../middleware");
      var router = require("express").Router();
  
      
      // Create a Payment
      router.post("/",[authJwt.verifyToken], controller.create);

      router.get("/:profileId",[authJwt.verifyToken], controller.findAll);

      app.use('/api/payment', router);
  
  };