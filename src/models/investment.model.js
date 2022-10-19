module.exports = (sequelize, Sequelize) => {
    const investment = sequelize.define("Investment", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Amount: {
        type: Sequelize.DECIMAL
      },
      Stake: {
        type: Sequelize.DECIMAL
      },
      StartupValuation: {
        type: Sequelize.DECIMAL
      },
      CurrentEvaluation: {
        type: Sequelize.DECIMAL
      }
    });
  
    return investment;
  };