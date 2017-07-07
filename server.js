/*
Run the application with one of the following commands to specify environment
Based on app-config.json
If no environment is specified, default to dev
If not logging flag is provided, default to no logging suppression
node server.js
node server.js -env dev -logging off
node server.js -env dev
node server.js -env qa
node server.js -env prod
*/

// Dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

// Get our API routes
const api = require('./server/routes/api');

//Get utilities
const utilities = require('./server/utilities/utilities');

// Get config
const appConfig = require('./server/config/app-config.json');

const envConfig = utilities.getEnvConfig();

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to src
app.use(express.static(path.join(__dirname, 'dist')));

// Set api routes
app.use(envConfig.api.node.path, api);

// Catch all other routes and return the index file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/*
 Get port from config and store in Express.
 */
const port = envConfig.api.node.port;
app.set('port', port);

/*
 Create HTTP server.
 */
const server = http.createServer(app);

/*
 Listen on provided port, on all network interfaces.
 */
server.listen(port, function() {
  console.log('API running on localhost:' + port + '/api');
  console.log('Webserver running on localhost:' + port);
});
