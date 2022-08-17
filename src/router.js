
const indexRouter = require('./controllers/index');
const routs = require('./Sattics')

const router = require('express').Router();

/**
 * @param {String} UserName
 * @return {Response(News[])}
 */
router.get(routs.getFavs, (req, res, next) => {
    try { indexRouter.getFavs(req, res) }
    catch { res.status(500).send() }
});

/**
Add To Favs 
* @param {Number} Id
* @param {String} UserName
* @return {Response} 
*/
router.post(routs.addFav, (req, res, next) => {
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
router.delete(routs.deleteFav, (req, res, next) => {
    try {
        indexRouter.deleteFav(req, res)
    } catch { res.status(500).send() }
});

router.get('/sources', (req, res, next) => {
    indexRouter.getSources(req, res, next)
})
router.post('/search/', (req, res, next) => {
    indexRouter.search(req, res, next)
})
router.get(/search/, (req, res, next) => {
    indexRouter.getSsearch(req, res, next)
})


module.exports = router;