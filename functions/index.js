const functions = require("firebase-functions");

// A basic test function
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
