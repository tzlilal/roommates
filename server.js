// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./server/config/database');

// Get our API routes
const api = require('./server/routes/api');

const app = express();
// connect app to mongoose 
mongoose.connect('mongodb://localhost:27017/appdb'); 

// mongoose.connect('mongodb://test-user:test_pw@ds121289.mlab.com:21289/roommates');

// mongoose.connect(config.database, { useMongoClient: true});
// // On Connection
// mongoose.connection.on('connected', () => {
//   console.log('Connected to Database '+config.database);
// });
// // On Error
// mongoose.connection.on('error', (err) => {
//   console.log('Database error '+err);
// });

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));