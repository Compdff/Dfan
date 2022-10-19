module.exports = app => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
      const controller = require("../controllers/verticals.controller");
      const { authJwt } = require("../middleware");
      var router = require("express").Router();
  
      // Retrieve all Verticals
      router.get("/", [authJwt.verifyToken],controller.findAll);
      
      // Create a new Vertical 
      router.post("/create-verticals",[authJwt.verifyToken], controller.create)

        // Update a vertical with id
        router.put("/:id",[authJwt.verifyToken], controller.update);

        // Delete a vertical with id
      router.delete("/:id",[authJwt.verifyToken], controller.delete);

      app.use('/api/verticals', router);
  
  };