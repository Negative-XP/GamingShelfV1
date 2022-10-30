const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const feedController = require("../controllers/feed");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'POST' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'POST';
        // and set requested url to /user/12
        req.url = req.path;
    }       
    next(); 
});



router.get("/:Incr", ensureAuth, feedController.getFeed);

router.post("/follow/:id", feedController.createFollow);

router.get('/feedForward', feedController.feedForward)



module.exports = router;