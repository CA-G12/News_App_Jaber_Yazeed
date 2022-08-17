
const indexRouter = require('./controllers/index');
const routs = require('./Sattics')

const router = require('express').Router();

/**
 * @param {String} UserName
 * @return {Response(News[])}
 */
router.get(routs.getFavs, (req, res) => {
    try { indexRouter.getFavs(req, res) }
    catch { res.status(500).send() }
});

/**
Add To Favs 
* @param {Number} Id
* @param {String} UserName
* @return {Response} 
*/
router.post(routs.addFav, (req, res) => {
    try {
        indexRouter.addFavs(req, res)
    } catch { res.status(500).send() }
});

/**
Add To Favs 
* @param {Number} Id
* @param {String} UserName
* @return {Response} 
*/
router.delete(routs.deleteFav, (req, res) => {
    try {
        indexRouter.deleteFav(req, res)
    } catch { res.status(500).send() }
});


module.exports = router;