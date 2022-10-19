module.exports = (sequelize, Sequelize) => {
    const InvestorProfile = sequelize.define("InvestorProfile", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Occupation: {
        type: Sequelize.STRING
      },
      Jobtitle: {
        type: Sequelize.STRING
      },
      CompanyName: {
        type: Sequelize.STRING
      },
      LinkedinUrl: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.INTEGER
      },
      PAN: {
        type: Sequelize.STRING
      },
      AadharNo: {
        type: Sequelize.STRING
      },
      InvestedStartupCount: {
        type: Sequelize.INTEGER
      },
      IsInvestmentZero: {
        type: Sequelize.BOOLEAN
      },
      IsPartOfAngel: {
        type: Sequelize.BOOLEAN
      },
      InvestementAmount: {
        type: Sequelize.DECIMAL
      },
      StartupTypes: {
        type: Sequelize.STRING
      },
      IsActive: {
        type: Sequelize.BOOLEAN
      },
      CreatedBy: {
        type: Sequelize.INTEGER
      },
      UpdatedBy: {
        type: Sequelize.INTEGER
      },
      JoiningRefrencePoints:{
        type:Sequelize.INTEGER
      }
    });
  
    return InvestorProfile;
  };