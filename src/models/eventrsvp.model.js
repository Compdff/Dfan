module.exports = (sequelize, Sequelize) => {
    const EventRsvp = sequelize.define("EventRsvp", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      EventId: {
        type: Sequelize.INTEGER
      },
      InvestorId: {
        type: Sequelize.INTEGER
      },
      Status: {
        type: Sequelize.INTEGER
      },
      CreatedDate: {
        type: Sequelize.DATE
      }
    });
  
    return EventRsvp;
  };