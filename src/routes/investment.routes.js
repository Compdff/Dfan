const { investment } = require("../models");

module.exports = app => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
      const controller = require("../controllers/investment.controller");
      const { authJwt} = require("../middleware");
      var router = require("express").Router();
    // Create a new investment
    router.post('/',controller.create);

    // Create a new investment for mobile
    router.post('/create-investment',controller.createInvestments);

    // Retrieve all investment
    router.get("/investorprofile/:investorid", [authJwt.verifyToken],controller.findAll);

    // Retrieve a investment with id
    router.get("/:id",[authJwt.verifyToken], controller.findOne);

  
    // Update a investment with id
    router.put("/:id",[authJwt.verifyToken], controller.update);

    // Delete a investment with id
    router.delete("/:id",[authJwt.verifyToken], controller.delete);

    // Retrive all my investment
    router.get("/investor/my-investment",[authJwt.verifyToken], controller.myInvestment);
    

    app.use('/api/investment', [authJwt.verifyToken],router);    
  };