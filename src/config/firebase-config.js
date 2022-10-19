var admin = require("firebase-admin");

var serviceAccount = require("../df-angels-firebase-adminsdk-gflag-671bd3ec79.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

module.exports.admin = admin