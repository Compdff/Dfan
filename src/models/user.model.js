module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("User", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserName: {
        type: Sequelize.STRING
      },
      MobileNo: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.INTEGER
      },
      GoogleKey: {
        type: Sequelize.STRING
      },
      DeviceToken: {
        type: Sequelize.STRING
      },
      DeviceType: {
        type: Sequelize.STRING
      },
      ProfileImage: {
        type: Sequelize.STRING(500)
      },
      ReferralCode: {
        type: Sequelize.STRING(20)
      },
      IsProfileCreated:{
        type: Sequelize.BOOLEAN,
        default:false
      },
      RoleId:{
        type: Sequelize.INTEGER,
        default:false
      },
      SocialId:{
        type: Sequelize.STRING,
        default:false
      },
      SocialType:{
        type: Sequelize.STRING,
        default:false
      }
    });
  
    return user;
  };