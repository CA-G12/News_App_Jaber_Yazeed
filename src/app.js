const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const router = require("./router");

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(router);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "..", "public", "errors", "404.html"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.msg || "Something went wrong" });
});

app.listen(app.get("port"), () => {
  console.log(`Listening to port ${app.get("port")}`);
});

module.exports = app;
