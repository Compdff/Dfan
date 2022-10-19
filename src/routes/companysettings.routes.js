const controller = require("../controllers/companysettings.controller");
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

  router.get("/",controller.findOne);

  router.post("/", controller.create);
  app.use('/api/companysettings', router);

};