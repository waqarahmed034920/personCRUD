const express = require('express');
const path = require('path');

var app = express();
const port = 4200;

app.use('/public', express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('/person', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '/public/person.html'));
});

app.get('/tasks', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '/public/tasks.html'));
});

app.listen(port, function() {
});

console.log('Plase goto http://localhost:4200 to access this app');
console.log('Perosn CRUD is listening on port :', port);