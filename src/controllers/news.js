const express = require('express');
const router = express.Router();
const path = require('path');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
require('dotenv').config();

router.get('/sources', (req, res, next) => {
    console.log(`https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.API_KEY}`);
    fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.API_KEY}`, {method: 'get'})
    .then((response) => response.json().then(data => res.send(data)))
    .catch((err) => next(err));
});

router.post('/search/', (req, res, next) => {
   const {search='', source='', language=''} = req.body;
    fetch(`https://newsapi.org/v2/top-headlines?q=${search}&sources=${source}&language=${language}&apiKey=${process.env.API_KEY}`, {method: 'get'})
    .then((response) => response.json().then(data => res.send(data)))
    .catch((err) => next(err));
});

router.get(/search/, (req, res, next) => {
    const params = new URLSearchParams(req.url);
    console.log(params);
   const search = params.get('search') || '';
   const source = params.get('source') || '';
   const language = params.get('language') || '';
    fetch(`https://newsapi.org/v2/top-headlines?q=${search}&sources=${source}&language=${language}&apiKey=${process.env.API_KEY}`, {method: 'get'})
    .then((response) => response.json().then(data => res.send(data)))
    .catch((err) => next(err));
});


module.exports = router;