module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    const controller = require("../controllers/investorprofile.controller");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();

    // Create a new Investor Profile
    router.post("/create-profile",[authJwt.verifyToken], controller.create);

    // Retrieve all available Startup Profile
    router.post("/available-startups", [authJwt.verifyToken],controller.findAllAvaillableProfile);

    // Retrieve all available Startup Profile
    router.post("/invested-startups", [authJwt.verifyToken],controller.investedstartuplist);

    // Retrieve all shortlisted by prefrence Startup Profile
     router.post("/shortlisted-startups", [authJwt.verifyToken],controller.findAllByShortlistedPrefrence);
    // Retrieve all Investor Profile
    router.get("/", [authJwt.verifyToken],controller.findAll);
  
    // Retrieve a single Investor Profile with id
    router.get("/:id",[authJwt.verifyToken], controller.findOne);
  
    // Update a Investor Profile with id
    router.put("/:id",[authJwt.verifyToken], controller.update);
  
    // Delete a Investor Profile with id
    router.delete("/:id",[authJwt.verifyToken], controller.delete);
  
    // delete all Investor Profiles
    router.delete("/",[authJwt.verifyToken], controller.deleteAll);
  
    // Retrieve a single Investor Profile with userid
    router.get("/user/:id",[authJwt.verifyToken], controller.findOneByUserId);

    // Create a new Investor Preference(like&dislike)
    router.post("/shortlist-startup",[authJwt.verifyToken], controller.createShortlistStartup);

    router.get("/startupDetail/:startupProfileId",[authJwt.verifyToken], controller.startupProfile);

    //Retrive investment of investor
    router.post("/my-investment",[authJwt.verifyToken], controller.findInvestment);

    

    app.use('/api/investor', router);

};