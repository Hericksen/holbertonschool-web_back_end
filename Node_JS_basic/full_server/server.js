// full_server/server.js
const express = require('express');
const app = express();
const routes = require('./routes'); // Import the routes defined in routes/index.js

// Use the routes for handling requests
app.use('/', routes);

// Set the server to listen on port 1245
const port = 1245;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
