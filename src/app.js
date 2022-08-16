const express = require('express');
const path = require('path');
const indexRouter = require('./controllers/index');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, '..', 'public')));


app.use(indexRouter);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'index.html'))
});


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "..", 'public', 'errors', '404.html'));
});


app.use((err, req, res, next) => {
    res.status(500).sendFile(path.join(__dirname, "..", 'public', 'errors', '500.html'));
});

app.listen(3000, () => {
    console.log(`Listening to port ${app.get('port')}`);
})