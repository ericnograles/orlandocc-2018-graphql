require('dotenv/config');
const { createServer } = require('http');
const createSecureServer = require('https').createServer;
const { ENVIRONMENT } = require('./api/config');
const express = require('express');
const winston = require('winston');
const api = require('./api');
const path = require('path');
const websockets = require('./api/websockets');
const fs = require('fs');

// Server-wide settings
winston.level = process.env.WINSTON_LEVEL || 'debug';
const dev = !ENVIRONMENT.IS_PRODUCTION;
const port = ENVIRONMENT.PORT;
const serverRoutes = ['/api', '/auth', '/explorer', '/salesforce'];

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

  // Setup WebSockets
  let server = createServer();
  await websockets(server);

  // Mount Express
  server.on('request', app);
  server.listen(port, err => {
    if (err) throw err;
    winston.info(`> Ready on http://localhost:${port}`);
  });

  // Local HTTPS
  if (!ENVIRONMENT.IS_PRODUCTION) {
    const httpsOptions = {
      key: fs.readFileSync('./ssl/localhost.key'),
      cert: fs.readFileSync('./ssl/localhost.cert'),
      requestCert: false,
      rejectUnauthorized: false
    };

    let secureServer = createSecureServer(httpsOptions);
    secureServer.on('request', app);
    secureServer.listen(ENVIRONMENT.LOCAL_SSL_PORT, err => {
      if (err) throw err;
      winston.info(
        `(localhost HTTPS) > Ready on https://localhost:${
          ENVIRONMENT.LOCAL_SSL_PORT
        }`
      );
    });
  }
}

// Start the server
startServer();
