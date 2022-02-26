// initialize variables
const router = require('express').Router();
const noteRoutes = require('../apiRoutes/noteRoutes.js');

//router for noteRoutes
router.use(noteRoutes);

// export router
module.exports = router;