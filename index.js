const http = require('http');

const port = process.env.PORT || 8080;

const app = require('./app');

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log('App started on port' + port);
});