const welcomePage = (req,res,next) => {
    console.log("I am at the login Page");
    res.send("Hello! Please wait. Its loading!")
}

module.exports = function(app){

    app.get('/',welcomePage);
    // app.get('/register', registerPage);
    // app.post('/register', signUp);
    // app.post('/login', userLogin);
    // app.get('/home', homePage);

}


