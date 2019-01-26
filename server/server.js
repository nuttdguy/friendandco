const app = require('./app');
const http = require('http');

// create http server
const server = http.createServer(app);

// set port
const PORT = process.env.PORT || 5000;

// listen for requests
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

module.exports = server;