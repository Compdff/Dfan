module.exports = app => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
      const controller = require("../controllers/startupdocument.controller");
      const { authJwt } = require("../middleware");
      var router = require("express").Router();
  
      // Create a new request for startup Document 
      router.post("/request/:StartupProfileId",[authJwt.verifyToken], controller.create);

      // Upload a startup Document with id  
      router.put("/upload/:id",[authJwt.verifyToken], controller.upload);

      // Verify a startup Document with id
      router.put("/verify/:id",[authJwt.verifyToken], controller.verify);

      // Retrieve all startup Documents by startup id for admin
      router.get("/startup/:startupid", [authJwt.verifyToken],controller.findAllDocs);

      // Retrieve all startup Documents by startup id
      router.get("/", [authJwt.verifyToken],controller.findAll);
      
      app.use('/api/document', router);
  
  };