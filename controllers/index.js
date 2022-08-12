//index for all controller routes

const router = require('express').Router();
const apiRoutes = (require('./api'));
const signroutes = (require('./home-routes'));
const logroutes = (require('./home-routes'))
//use apiRoutes for any request starting with /api/
router.use('/api',apiRoutes);
router.use("/", signroutes);
router.use("/login", logroutes);
router.use( (req, res) => {
    res.status(404).end();
});

module.exports = router;