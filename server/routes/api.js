const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');
const log = require('../lib/log');
const utilities = require('../utilities/utilities');

//Get config
const appConfig = require('../config/app-config.json');
const envConfig = utilities.getEnvConfig();


var mysql = require('mysql');
var connection = mysql.createConnection({
  "host": "sql3.freemysqlhosting.net",
  "database": "sql3184063",
  "user": "sql3184063",
  "password": "QqLchuGFm2",
  "port": "3306"
});

// connection.connect();
//
// connection.query('SELECT * from sql3184063.journey', function (err, rows, fields) {
//
//   console.log('err', err);
//   console.log('rows', rows);
//
//
//   if (err) {
//     throw err;
//   }
//
// });
//
//
// connection.end();


/*

Begin API Endpoints

*/

/* POST Journey data */
router.post('/journey', function(inReq, inRes) {
  log.consoleMsg('POST Journey User ' + inReq.originalUrl);

  var query = "INSERT INTO sql3184063.journey (firstName, lastName, `year`, phoneNumber, email, gender, ECFirstName, ECLastName, ECPhone, college) VALUES (" +
    "'" + inReq.body.firstName + "'," +
    "'" + inReq.body.lastName + "'," +
    "'" + inReq.body.year + "'," +
    "'" + inReq.body.phoneNumber + "'," +
    "'" + inReq.body.email + "'," +
    "'" + inReq.body.gender + "'," +
    "'" + inReq.body.ECFirstName + "'," +
    "'" + inReq.body.ECLastName + "'," +
    "'" + inReq.body.ECPhone + "'," +
    "'" + inReq.body.college + "')";

  console.log('Sending INSERT INTO sql3184063.journey request');

  connection.query(query, function (err, rows) {

    if (err) {
      inRes.status(500).send('I\'m sorry, something went wrong');
      throw err;
    }

    console.log('[SUCCESS] Post ' + JSON.stringify(rows));
    inRes.send('[SUCCESS] Post ' + JSON.stringify(rows));

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
