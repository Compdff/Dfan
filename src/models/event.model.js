module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("Event", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      EventTitle: {
        type: Sequelize.STRING
      },
      EventDate: {
        type: Sequelize.DATE
      },
      StartTime: {
        type: Sequelize.DATE
      },
      EndTime: {
        type: Sequelize.DATE
      },
      CallLink: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      ImageURL: {
        type: Sequelize.STRING
      },
      RecordingURL: {
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.INTEGER
      },
      CreatedBy: {
        type: Sequelize.INTEGER
      },
      UpdatedBy: {
        type: Sequelize.INTEGER
      },
      IsActive: {
        type: Sequelize.INTEGER
      },
      CallForMoneyStartTime: {
        type: Sequelize.DATE
      },
      CallForMoneyEndTime: {
        type: Sequelize.DATE
      },
      RegistrationLink: {
        type: Sequelize.STRING(500)
      },
      PortalEventId: {
        type: Sequelize.INTEGER
      },
      PortalEventModifiedDate: {
        type: Sequelize.DATE
      },
      TimeZone: {
        type: Sequelize.STRING
      }
      
    });
  
    return Event;
  };