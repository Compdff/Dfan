module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    const controller = require("../controllers/fileupload.controller");
    const { authJwt} = require("../middleware");
    var router = require("express").Router();
  
  router.post('/',controller.create);
  app.use('/api/fileupload', [authJwt.verifyToken],router);    
};