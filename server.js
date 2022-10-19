const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();



var corsOptions = {
  origin: "http://localhost:1337"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");
const Role = db.role;

//For update database force:true
//For update databse Alter:true
db.sequelize.sync({force:true}).then(() => {
  console.log('Drop and Resync Db');
   initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DFAN API-V1." });
});

require('./src/routes/auth.routes')(app);
require("./src/routes/user.routes")(app);
require("./src/routes/startupprofile.routes")(app);
require("./src/routes/investorprofile.routes")(app);
require("./src/routes/query.routes")(app);
require("./src/routes/fileupload.routes")(app);
require("./src/routes/verticals.routes")(app);
require("./src/routes/event.routes")(app);
require("./src/routes/investment.routes")(app);
require("./src/routes/startupdocument.routes")(app);
require("./src/routes/otp.routes")(app);
require("./src/routes/companysettings.routes")(app);
require("./src/routes/membership.routes")(app);
require("./src/routes/payment.routes")(app);
require("./src/routes/referral.routes")(app);
require("./src/routes/blog.routes")(app);
require("./src/routes/country.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

process.on('uncaughtException', function (err) {
  console.error(err);
});

function initial() {
  Role.create({
    Id: 1,
    Name: "investor"
  });

  Role.create({
    Id: 2,
    Name: "startup"
  });

  Role.create({
    Id: 3,
    Name: "admin"
  });
}
