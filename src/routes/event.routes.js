module.exports = app => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
      const controller = require("../controllers/event.controller");
      const { authJwt } = require("../middleware");
      var router = require("express").Router();
  
      // Retrieve all Events
      router.get("/", [authJwt.verifyToken],controller.findAll);

      // Retrieve a single event with id
      router.get("/:id",[authJwt.verifyToken], controller.findOne);

      // Delete a event with id
      router.delete("/:id",[authJwt.verifyToken], controller.delete);
        
      // Create a new Event 
      router.post("/create-event",[authJwt.verifyToken], controller.create)

      // Retrieve all Events
      router.get("/startup/:startupId", [authJwt.verifyToken],controller.findAllByStartupId);

      // Update a event with id
    router.put("/:id",[authJwt.verifyToken], controller.update);

    // Update a event status with id
    router.put("/updatestate/:id",[authJwt.verifyToken], controller.updateState);

    // Create a new EventRSVP 
    router.post("/create-eventrsvp",[authJwt.verifyToken], controller.createRsvp)

    // Retrieve all EventsRSVP
    router.get("/eventrsvp/rsvp/:eventId", [authJwt.verifyToken],controller.findAllRsvp);


      app.use('/api/event', router);
  
  };