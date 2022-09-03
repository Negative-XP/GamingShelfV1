module.exports = { //Go to the homepage
    getProfile: (req,res)=>{ //function to get the index.ejs which is in the views folder
        res.render('profile.ejs') //render the homepage ejs file
    }
    
    
}