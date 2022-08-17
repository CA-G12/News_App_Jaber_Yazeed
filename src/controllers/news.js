const fetch = require("node-fetch");
require("dotenv").config();

const { API_KEY } = process.env;

const getSources = (req, res, next) => {
  fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`)
    .then((response) =>
      response.json().then((data) => {
        if (data.status === "error") {
          const err = new Error();
          err.status = 400;
          err.msg = data.message;
          next(err);
        } else {
          res.json(data);
        }
      })
    )
    .catch((err) => next(err));
};

const getNews = (req, res, next) => {
  const { search = "", source = "", language = "" } = req.query;

  fetch(`https://newsapi.org/v2/top-headlines?q=${search}&sources=${source}&language=${language}&apiKey=${API_KEY}`)
    .then((response) =>
      response.json().then((data) => {
        if (data.status === "error") {
          const err = new Error();
          err.status = 400;
          err.msg = data.message;
          next(err);
        } else {
          res.json(data);
        }
      })
    )
    .catch((err) => next(err));
};

module.exports = {
  getSources,
  getNews,
};
