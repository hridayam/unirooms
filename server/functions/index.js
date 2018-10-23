const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');

const registerUser = require('./register_user');
const verifyUser = require('./verify_user');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://uniroom-project.firebaseio.com"
});

exports.registerUser = functions.https.onRequest(registerUser);
exports.verifyUser = functions.https.onRequest(verifyUser);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
