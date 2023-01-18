const welcomePage = (req,res,next) => {

    console.log("I am at the login Page");
    res.render('welcome',{
        success: false
    });
}

module.exports = {
    welcomePage: welcomePage
}; 