const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
require('dotenv').config();

const getSources = (req, res, next) => {
    console.log(`https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.API_KEY}`);
    fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.API_KEY}`, { method: 'get' })
        .then((response) => response.json().then(data => res.send(data)))
        .catch((err) => next(err));
};

const search = (req, res, next) => {
    const { search = '', source = '', language = '' } = req.body;
    fetch(`https://newsapi.org/v2/top-headlines?q=${search}&sources=${source}&language=${language}&apiKey=${process.env.API_KEY}`, { method: 'get' })
        .then((response) => response.json().then(data => res.send(data)))
        .catch((err) => next(err));
};

const getSsearch = (req, res, next) => {
    const params = new URLSearchParams(req.url);
    console.log(params);
    const search = params.get('search') || '';
    const source = params.get('source') || '';
    const language = params.get('language') || '';
    fetch(`https://newsapi.org/v2/top-headlines?q=${search}&sources=${source}&language=${language}&apiKey=${process.env.API_KEY}`, { method: 'get' })
        .then((response) => response.json().then(data => res.send(data)))
        .catch((err) => next(err));
};


module.exports = {
    getSources, search, getSsearch
};