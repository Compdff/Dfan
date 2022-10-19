module.exports = (sequelize, Sequelize) => {
    const Verticals = sequelize.define("Verticals", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: Sequelize.STRING
      }
    });
    return Verticals;
};