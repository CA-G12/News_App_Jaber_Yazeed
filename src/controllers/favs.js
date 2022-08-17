const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "..", "Data", "favs.json");

// const readFilePromise = (path) =>
//   new Promise((res, rej) => {
//     fs.readFile(path),
//       (err, result) => {
//         if (err) {
//           rej(err);
//         } else {
//           res(result);
//         }
//       };
//   });

const fetchData = (fileData, username, id) => {
  return new Promise((resolve, rejects) => {
    try {
      if (fileData[username] && !fileData[username].includes(id)) {
        filieData = fileData[username].push(id);
        console.log(fileData);
      } else if (!fileData[username]) {
        fileData[username] = [id];
      }
      resolve(fileData);
    } catch {
      rejects("Un Expectd Error");
    }
  });
};

const writeData = (fileData) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(filePath, JSON.stringify(fileData), "utf-8", (err) => {
      err ? rejects("Error While Write The File") : resolve("Done");
    });
  });
};

const addFavs = (req, res, next) => {
  const username = req.body.username;
  const id = req.body.newsid;

  //Read File
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) throw new Error("Un Expected Error");
    fetchData(JSON.parse(data), username, id)
      .then((data) => writeData(data))
      .then((x) => res.send(x))
      .catch((err) => res.send(err));
  });
};

const deleteFav = (req, res, next) => {
  const username = req.params.username;
  const id = req.params.favid;
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) throw new Error("Un Expected Error");
    else {
      const dta = JSON.parse(data);
      if (dta[username].includes(Number(id))) {
        dta[username] = dta[username].filter((x) => x != id);
        writeData(dta);
        res.send("Deleted");
      } else throw new Error("The News Doesn't Exiist");
    }
  });
};

const getFavs = (req, res, next) => {
  const username = req.params.username;
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) throw new Error("Un Expected Error");
    else {
      res.send(JSON.parse(data)[username]);
    }
  });
};

module.exports = {
  addFavs,
  deleteFav,
  getFavs,
};
