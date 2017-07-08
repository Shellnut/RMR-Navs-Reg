const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');
const utilities = require('../utilities/utilities');

//Get config
const appConfig = require('../config/app-config.json');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: appConfig.api.host,
  database: appConfig.api.database,
  user: appConfig.api.user,
  password: appConfig.api.password,
  port: appConfig.api.port
});

/*
Begin API Endpoints
*/

/* POST Journey data */
router.post('/journey', function(inReq, inRes) {
  console.log('POST Journey User ' + inReq.originalUrl);

  // query
  var query = "INSERT INTO " + appConfig.api.database + ".journey (firstName, lastName, `year`, phoneNumber, email, gender, ECFirstName, ECLastName, ECPhone, college) VALUES (" +
    "'" + inReq.body.firstName + "'," +
    "'" + inReq.body.lastName + "'," +
    "'" + inReq.body.year + "'," +
    "'" + inReq.body.phoneNumber + "'," +
    "'" + inReq.body.email + "'," +
    "'" + inReq.body.gender + "'," +
    "'" + inReq.body.ECFirstName + "'," +
    "'" + inReq.body.ECLastName + "'," +
    "'" + inReq.body.ECPhone + "'," +
    "'" + inReq.body.college + "');";

  console.log('Sending INSERT INTO ' + appConfig.api.database + '.journey request');

  // send request
  connection.query(query, function (err, rows) {

    // handle error
    if (err) {
      inRes.status(500).send(err);
    }
    else {
      // On success
      console.log('[SUCCESS] POST Journey Use ' + inReq.body.email);
      inRes.send(inReq.body);
    }

  });

});

/* GET Journey data */
router.get('/journey', function(inReq, inRes) {
  console.log('GET Journey Users ' + inReq.originalUrl);

  // query
  var query = "SELECT * FROM " + appConfig.api.database + ".journey;";

  console.log('GET all from ' + appConfig.api.database + '.journey request');

  // send request
  connection.query(query, function (err, rows) {

    // handle error
    if (err) {
      inRes.status(500).send(err);
    }
    else {
      // On success
      console.log('[SUCCESS] get journey');
      inRes.send(rows);
    }

  });

});

/* POST user request */
router.post('/user', function(inReq, inRes) {

  // Send encrypted data
  var encrypted = utilities.encrypt(inReq.body.password, appConfig.secret);
  inReq.body.ciphertext = encrypted.ciphertext;
  inReq.body.salt = encrypted.salt;
  inReq.body.iv = encrypted.iv;
  inReq.body.HMAC = encrypted.HMAC;

  var query = "INSERT INTO " + appConfig.api.database + ".users (username, firstName, lastName, ciphertext, salt, iv, HMAC) VALUES (" +
    "'" + inReq.body.email + "'," +
    "'" + inReq.body.firstName + "'," +
    "'" + inReq.body.lastName + "'," +
    "'" + inReq.body.ciphertext + "'," +
    "'" + inReq.body.salt + "'," +
    "'" + inReq.body.iv + "'," +
    "'" + inReq.body.HMAC + "');";

  // send request
  connection.query(query, function (err, rows) {

    // handle error
    if (err) {

      console.log('err is', err);
      inRes.status(500).send(err);

    }
    else {
      // On success
      console.log('[SUCCESS] Post ' + JSON.stringify(rows));
      inRes.send('[SUCCESS] Post ' + JSON.stringify(rows));
    }


  });


});

/* GET user request */
router.get('/user', function(inReq, inRes) {

  console.log('get authenticate request', inReq.originalUrl);

  // Get username
  const username = inReq.originalUrl.split('=').pop();

  // query
  var query = "SELECT users.username, users.firstName, users.lastName, users.ciphertext, users.salt, users.iv, users.HMAC " +
      "FROM " + appConfig.api.database + ".users WHERE username = '" + username + "';";

  // send request
  connection.query(query, function (err, rows) {

    // handle error
    if (err) {
      inRes.status(500).send(err);
    }
    else {
      // On success
      console.log('[SUCCESS] Get ' + username);
      inRes.send(rows[0]);
    }

  });

});


// Catch all other routes
router.get('/*', function(req, res) {
    res.send('Invalid API path');
});

/*

END API Endpoints

*/


module.exports = router;
