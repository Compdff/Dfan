//Local Database
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "pass",
    DB: "DFAN",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };



// Live database connection

// module.exports = {
//     HOST: "dfan-dev.chrtgcetqhen.us-east-2.rds.amazonaws.com",
//     USER: "postgres",
//     PASSWORD: "C0mpany123",
//     DB: "dfan",
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };