// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Get our API routes
const user = require('./server/routes/user');
const auth = require('./server/routes/auth');
const settings = require('./server/routes/settings');
const matches = require('./server/routes/matches');

const app = express();
// connect app to mongoose 
mongoose.connect('mongodb://localhost:27017/appdb'); 

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist (the folder that will be accessible from outside)
app.use(express.static(path.join(__dirname, 'dist')));
app.use("/images", express.static(path.join("server/images")));

// Set our api routes
app.use('/', user);
app.use('/auth', auth);
app.use('/settings', settings);
app.use('/matches', matches);

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