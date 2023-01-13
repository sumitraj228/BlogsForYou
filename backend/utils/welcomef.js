const welcomePage = (req,res,next) => {

    console.log("I am at the login Page");
    res.render('welcome');
}

module.exports = {
    welcomePage: welcomePage
}; 