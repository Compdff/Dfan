module.exports = (sequelize, Sequelize) => {
    const Query = sequelize.define("Query", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      StartupProfileId: {
        type: Sequelize.INTEGER
      },
      Question: {
        type: Sequelize.STRING
      },
      QueryBy: {
        type: Sequelize.INTEGER
      },
      Comment: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.INTEGER
      },
      AttachDoc: {
        type: Sequelize.STRING
      }
    });
  
    return Query;
  };