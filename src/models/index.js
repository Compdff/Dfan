const dbConfig = require("../config/db.config.js");
const cors = require('cors');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.startupprofile = require("../models/startupprofile.model")(sequelize, Sequelize);
db.investorprofile = require("../models/investorprofile.model")(sequelize, Sequelize);
db.query = require("../models/query.model")(sequelize, Sequelize);
db.startupfounder = require("../models/startupfounder.model")(sequelize, Sequelize);
db.investorpreference = require("../models/investorpreference.model")(sequelize, Sequelize);
db.investment = require("../models/investment.model")(sequelize, Sequelize);
db.event = require("../models/event.model")(sequelize, Sequelize);
db.verticals = require("../models/verticals.model")(sequelize, Sequelize);
db.startupdocument = require("../models/startupdocument.model")(sequelize, Sequelize);
db.companysettings = require("../models/companysettings.model")(sequelize, Sequelize);
db.membership = require("../models/membership.model")(sequelize, Sequelize);
db.payment = require("../models/payment.model")(sequelize, Sequelize);
db.referral = require("../models/referral.model")(sequelize, Sequelize);
db.eventrsvp = require("../models/eventrsvp.model")(sequelize, Sequelize);
db.blog = require("../models/blog.model")(sequelize, Sequelize);
db.country = require("../models/country.model")(sequelize, Sequelize);




db.role.belongsToMany(db.user, {
  through: "User_Roles",
  foreignKey: "RoleId",
  otherKey: "UserId"
});
db.user.belongsToMany(db.role, {
  through: "User_Roles",
  foreignKey: "UserId",
  otherKey: "RoleId"
});

db.startupprofile.belongsTo(db.user, {foreignKey: 'UserId', targetKey: 'Id'});
db.user.hasOne(db.startupprofile, {foreignKey: 'UserId', targetKey: 'Id'});

db.startupprofile.hasMany(db.startupfounder, { foreignKey: 'StartupProfileId', sourceKey: 'Id'});
db.startupfounder.belongsTo(db.startupprofile, {foreignKey: 'StartupProfileId', targetKey: 'Id'});

db.investorprofile.belongsTo(db.user, { foreignKey: "UserId"});
db.user.hasOne(db.investorprofile, {foreignKey: 'UserId', targetKey: 'Id'});


db.investment.belongsTo(db.investorprofile, {foreignKey: 'InvestorProfileId', targetKey: 'Id'});
db.investment.belongsTo(db.startupprofile, {foreignKey: 'StartupProfileId', targetKey: 'Id'});


db.query.belongsTo(db.startupprofile, { foreignKey: "StartupProfileId", targetKey: 'Id'});
db.query.belongsTo(db.investorprofile,{foreignKey: "QueryBy", targetKey: 'Id'});

db.event.belongsTo(db.startupprofile, {foreignKey: 'StartupProfileId', targetKey: 'Id'});
db.startupprofile.belongsTo(db.verticals, {foreignKey: 'VerticalId', targetKey: 'Id'});

db.membership.belongsTo(db.user, {foreignKey: 'UserId', targetKey: 'Id'});
db.payment.belongsTo(db.user, {foreignKey: 'UserId', targetKey: 'Id'});
db.referral.belongsTo(db.investorprofile, {foreignKey: 'RefInvestorId', targetKey: 'Id'});
db.referral.belongsTo(db.investorprofile, {foreignKey: 'InvestorId', targetKey: 'Id'});



// Here we can connect startupprofile and startupfounder base on startupprofile's id

db.investorpreference.belongsTo(db.investorprofile, {foreignKey: "InvestorProfileId"});
db.investorpreference.belongsTo(db.startupprofile, {foreignKey: "StartupProfileId"});

db.ROLES = ["investor", "startup", "admin"];
db.STATUS = {"pending":1,"resolved":2};
db.STATE = {"open":0,"ongoing":1,"close":2};
db.BUSINESSMODEL = {"B2B":0,"B2C":1,"B2B2C":2};
db.CURRENTSTATE = {"in progress":0,"call in progress":1,"closed":2};



module.exports = db;
