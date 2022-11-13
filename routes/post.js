const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }       
    next(); 
});


router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost/:id", upload.single("file"), postsController.createPost);

router.get("/likePost/:id", postsController.likePost);

router.delete("/delete/:id", postsController.deletePost);

router.post("/createComment/:id", postsController.createComment);


module.exports = router;