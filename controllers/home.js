module.exports = { //Go to the homepage
    getIndex: (req,res)=>{ //function to get the index.ejs which is in the views folder
        res.render('index.ejs') //render the homepage ejs file
    }
}
