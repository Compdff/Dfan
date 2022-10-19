module.exports = (sequelize, Sequelize) => {
    const StartupDocument = sequelize.define("StartupDocument", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      StartupProfileId: {
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      URL: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.INTEGER
      }
    });

    return StartupDocument;
  };
