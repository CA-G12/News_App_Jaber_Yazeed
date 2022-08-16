const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());

app.use(path.join(__dirname, '..', 'public'));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "..", 'public', 'errors', '404.html'));
})

app.use((err,req, res, next) => {
    res.status(500).sendFile(path.join(__dirname, "..", 'public', 'errors', '500.html'));
})