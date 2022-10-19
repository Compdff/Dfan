const controller = require("../controllers/membership.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  router.post("/reminder",[authJwt.verifyToken], controller.createReminder);
  router.post("/amount",[authJwt.verifyToken], controller.createMembership);
  router.get("/",[authJwt.verifyToken], controller.findOne);


  app.use('/api/membership', router);

};