module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    const controller = require("../controllers/startupprofile.controller.js");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();

    // Create a new Startup Profile
    router.post("/create-profile",[authJwt.verifyToken], controller.create);

    // Retrieve all Startup Profile
    router.get("/", [authJwt.verifyToken],controller.findAll);
  
    // Retrieve a single Startup Profile with id
    router.get("/:id",[authJwt.verifyToken], controller.findOne);
  
    // Update a Startup Profile with id
    router.put("/:id",[authJwt.verifyToken], controller.update);
  
    // Delete a Startup Profile with id
    router.delete("/:id",[authJwt.verifyToken], controller.delete);
  
    // delete all Startup Profiles
    router.delete("/",[authJwt.verifyToken], controller.deleteAll);
  
    // Retrieve a single Profile with userid
    router.get("/user/:id",[authJwt.verifyToken], controller.findOneByUserId);
    
    // Retrieve a single Profile with userid
    router.post("/current-valuation",[authJwt.verifyToken], controller.updateCurrentValuation);

    app.use('/api/startup', router);

};