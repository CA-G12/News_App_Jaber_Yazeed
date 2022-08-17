const { addFavs, deleteFav, getFavs, getNews, getSources } = require("./controllers/index");

const routs = require("./Sattics");

const router = require("express").Router();

router.get("/sources", getSources);
router.get("/news", getNews);

/**
 * @param {String} UserName
 * @return {Response(News[])}
 */
router.get(routs.getFavs, (req, res) => {
  try {
    getFavs(req, res);
  } catch {
    res.status(500).send();
  }
});

/**
Add To Favs 
* @param {Number} Id
* @param {String} UserName
* @return {Response} 
*/
router.post(routs.addFav, (req, res) => {
  try {
    addFavs(req, res);
  } catch {
    res.status(500).send();
  }
});

/**
Add To Favs 
* @param {Number} Id
* @param {String} UserName
* @return {Response} 
*/
router.delete(routs.deleteFav, (req, res) => {
  try {
    deleteFav(req, res);
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
