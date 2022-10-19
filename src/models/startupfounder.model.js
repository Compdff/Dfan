module.exports = (sequelize, Sequelize) => {
    const StartupFounder = sequelize.define("StartupFounder", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FounderName: {
        type: Sequelize.STRING
      },
      LinkedinUrl: {
        type: Sequelize.STRING
      },
      Designation: {
        type: Sequelize.STRING
      },
      EmailID: {
        type: Sequelize.STRING
      },
      MobileNumber: {
        type: Sequelize.STRING
      },
      IsActive: {
        type: Sequelize.INTEGER
      }
    });
  
    return StartupFounder;
  };