module.exports = (sequelize, Sequelize) => {
    const Referral = sequelize.define("Referral", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },      
      CreatedDate: {
        type: Sequelize.DATE
      }
    });
  
    return Referral;
  };