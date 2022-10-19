module.exports = (sequelize, Sequelize) => {
    const InvestorPreference = sequelize.define("InvestorPreference", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }
    });
  
    return InvestorPreference;
  };