module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("Payment", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      PaymentDate: {
        type: Sequelize.DATE
      },
      Status: {
        type: Sequelize.STRING(100)
      },
      Amount: {
        type: Sequelize.DECIMAL(11,2)
      },
      TransactionKey: {
        type: Sequelize.STRING(500)
      },
      ReturnObject: {
        type: Sequelize.STRING(500)
      }
    });
  
    return Payment;
  };