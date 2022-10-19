module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    const users = require("../controllers/user.controller.js");
    const { authJwt ,verifySignUp} = require("../middleware");
    var router = require("express").Router();
  
    // Create a new user
    router.post("/",[
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ], users.create);

    router.post("/googleRegister", users.googleRegister);
    
  
    // Retrieve all admin  users
    router.get("/", [authJwt.verifyToken],users.findAll);
  
    // Retrieve all published users
    router.get("/published",[authJwt.verifyToken], users.findAllPublished);
  
    // Retrieve a single user with id
    router.get("/user",[authJwt.verifyToken], users.findOne);

    // Retrieve a single user with id
    router.get("/:id",[authJwt.verifyToken], users.findOneById);
  
    // Retrieve a single user with username
    router.get("/userexist/:username", users.findByEmail);

    // Update a user with id
    router.put("/:id",[authJwt.verifyToken], users.update);
  
    // Delete a user with id
    router.delete("/:id",[authJwt.verifyToken], users.delete);
  
    // delete all users
    router.delete("/",[authJwt.verifyToken], users.deleteAll);

    // Change Password
    router.put("/user/ChangePassword",[authJwt.verifyToken], users.ChangePassword);
    
    // Forget Password
    router.post("/user/ForgetPassword", users.forgetPassword);

    // Test
    router.get("/user/Test", users.test);


  
    app.use('/api/users', router);
  };