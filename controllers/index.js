//index for all controller routes

const router = require('express').Router();

//use apiRoutes for any request starting with /api/
const apiRoutes = (require('./api'));

router.use( (req, res) => {
    res.status(404).end();
});

module.exports = router;