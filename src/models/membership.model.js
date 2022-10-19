module.exports = (sequelize, Sequelize) => {
    const Membership = sequelize.define("Membership", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      StartDate: {
        type: Sequelize.DATE
      },
      EndDate: {
        type: Sequelize.DATE
      },
      Amount: {
        type: Sequelize.DECIMAL(11,2)
      },
      Reminder: {
        type: Sequelize.INTEGER
      },
      ReminderUpdateDate: {
        type: Sequelize.DATE
      }
    });
    return Membership;
};