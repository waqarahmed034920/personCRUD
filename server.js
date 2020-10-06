const express = require('express');
const path = require('path');

var app = express();
const port = 3000;

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, function() {
});

console.log('Plase goto http://localhost:3000 to access this app');
console.log('Perosn CRUD is listening on port :', port);