
module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("Country", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: Sequelize.STRING
      },
      Flag: {
        type: Sequelize.STRING
      },
      Code: {
        type: Sequelize.STRING
      },
      DialCode: {
        type: Sequelize.STRING
      }
      
    });
  
    return Country;
  };