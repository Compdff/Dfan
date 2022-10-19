module.exports = (sequelize, Sequelize) => {
    const CompanySettings = sequelize.define("CompanySettings", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      AboutUsUrl: {
        type: Sequelize.STRING(200)
      },
      BlogURL: {
        type: Sequelize.STRING(200)
      },
      CompanyName: {
        type: Sequelize.STRING(200)
      },
      CompanyShortName: {
        type: Sequelize.STRING(100)
      },
      RefInvestorPoints: {
        type: Sequelize.INTEGER
      },
      InvestorPoints: {
        type: Sequelize.INTEGER
      },
      TncUrl: {
        type: Sequelize.STRING
      },
      MembershipFee: {
        type: Sequelize.INTEGER
      }

    });
    return CompanySettings;
};