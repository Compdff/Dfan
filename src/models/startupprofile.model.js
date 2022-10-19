module.exports = (sequelize, Sequelize) => {
    const StartupProfile = sequelize.define("StartupProfile", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      StartupName: {
        type: Sequelize.STRING
      },
      RaisingFunds: {
        type: Sequelize.INTEGER
      },
      OfferedStake: {
        type: Sequelize.INTEGER
      },
      ProductDescription: {
        type: Sequelize.STRING
      },
      Website: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.INTEGER
      },
      DeckFilename: {
        type: Sequelize.STRING
      },
      DeckURL: {
        type: Sequelize.STRING
      },
      CurrentState: {
        type: Sequelize.INTEGER
      },
      StateDetail: {
        type: Sequelize.STRING
      },
      InitialEvaluation: {
        type: Sequelize.INTEGER
      },
      CurrentEvaluation: {
        type: Sequelize.INTEGER
      },
      Logo: {
        type: Sequelize.STRING(2000)
      },
      AboutUs: {
        type: Sequelize.STRING(500)
      },
      Horizontal: {
        type: Sequelize.STRING
      },
      TechnologyUsed: {
        type: Sequelize.STRING
      },
      Location: {
        type: Sequelize.STRING
      },
      BusinessModel: {
        type: Sequelize.INTEGER
      },
      WhatNHowProblemSolve: {
        type: Sequelize.STRING(2000)
      },
      HowBigMarketAvailable: {
        type: Sequelize.DECIMAL(9,2)
      },
      IsIdeaSacaleDigitally: {
        type: Sequelize.INTEGER
      },
      HowProductFitInMarket: {
        type: Sequelize.STRING(2000)
      },
      YourUSP: {
        type: Sequelize.STRING(2000)
      },
      IsRevenueDataShareable: {
        type: Sequelize.INTEGER
      },
      ExitStrategyForUs: {
        type: Sequelize.STRING(2000)
      },
      IsAcceptTnC: {
        type: Sequelize.INTEGER
      },
      SourcePerson: {
        type: Sequelize.STRING(500)
      }
      

    });
  
    return StartupProfile;
  };