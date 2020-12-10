const firebaseAdmin = require("firebase-admin");
const serviceAccountKey = require("../firebase.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

const firestore = firebaseAdmin.firestore()

module.exports = firestore
