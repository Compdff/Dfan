module.exports = app => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
      const controller = require("../controllers/query.controller");
      const { authJwt } = require("../middleware");
      var router = require("express").Router();
  
      // Retrieve all Query by startup id for investor user
      router.get("/startupProfileId/:startupid", [authJwt.verifyToken],controller.findAll);

      // Create a new Query 
      router.post("/:startupid",[authJwt.verifyToken], controller.create);

      // Update a Query with id
      router.put("/:id",[authJwt.verifyToken], controller.update);

       // Get a Query with id
       router.get("/:id",[authJwt.verifyToken], controller.findOne);

       // Retrieve all Query by admin
      router.get("/startupqueries/:startupid", [authJwt.verifyToken],controller.findAllQuery);

      // Retrieve all Query by startup id for startup user
      router.get("/startup/queries", [authJwt.verifyToken],controller.findQueries);

      app.use('/api/query', router);
  
  };