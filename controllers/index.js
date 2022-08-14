//index for all controller routes

const router = require('express').Router();
const apiRoutes = (require('./api'));
<<<<<<< HEAD
const homeRoutes = (require('./home-routes'));
//use apiRoutes for any request starting with /api/
router.use('/api',apiRoutes);
router.use("/", homeRoutes);
=======
const signroutes = (require('./home-routes'));
const logroutes = (require('./home-routes'))
//use apiRoutes for any request starting with /api/
router.use('/api',apiRoutes);
router.use("/", signroutes);
router.use("/login", logroutes);
>>>>>>> 335996e03a15632ef931379e908e6ad3688ce9bf
router.use( (req, res) => {
    res.status(404).end();
});

module.exports = router;