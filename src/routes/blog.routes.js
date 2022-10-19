module.exports = app => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
      const controller = require("../controllers/blog.controller");
      const { authJwt } = require("../middleware");
      var router = require("express").Router();
  
     // create new blog
      router.post("/create-blog",[authJwt.verifyToken], controller.create)

      // Retrieve all Blogs
      router.get("/", [authJwt.verifyToken],controller.findAll);

      // Update a blog with id
       router.put("/:id",[authJwt.verifyToken], controller.update);

       // Delete a blog with id
      router.delete("/:id",[authJwt.verifyToken], controller.delete);

      // Retrieve a single blog with id
      router.get("/:id",[authJwt.verifyToken], controller.findOne);

    
      app.use('/api/blog', router);
  
  };