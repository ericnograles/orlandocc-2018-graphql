require('dotenv/config');
const { createServer } = require('http');
const { ENVIRONMENT } = require('./api/config'); 
const express = require('express');
const winston = require('winston');
const api = require('./api');
const path = require('path');
const websockets = require('./api/websockets');

// Server-wide settings
winston.level = process.env.WINSTON_LEVEL || 'debug';
const dev = !ENVIRONMENT.IS_PRODUCTION;
const port = ENVIRONMENT.PORT;
const serverRoutes = ['/api', '/auth', '/explorer'];

// Scaffold the server
async function startServer() {
  // Web API + Web Sockets Servers
  const app = await api(express());

  // React SPA builds served up
  app.use(express.static('build'));
  app.get('*', function(req, res, next) {
    if (serverRoutes.indexOf(req.url) < 0) {
      return res
        .set('Content-Type', 'text/html')
        .sendFile(__dirname + '/build/index.html');
    }
    return next();
  });

  let server = createServer(app);
  await websockets(server);
  server.listen(port, err => {
    if (err) throw err;
    winston.info(`> Ready on http://localhost:${port}`);
  });
}

// Start the server
startServer();
