const user = require('../../models/userProfile');

const registerPage = (req,res,next) =>{
    
    console.log("Welcome to the Register Page");
    res.render('register',{
        failure: false
    });
}

const loginPage = (req,res,next) =>{
    console.log("You are in the login Page");
    res.render('login');
}

const signUp = (req,res,next) =>{

    console.log("User got registered")
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;

    const newUser = new user({
        name: name,
        username: username,
        password: password
    });

    let query = {"username": username};

    user.find(query, async function(err,result){
        if(err)
            throw err;
        else    
        {
            if(result.length>0)
                res.render('register',{
                    failure: true
                });
            else
            {
                await newUser.save();
                res.render('welcome',{
                    success: true
                });
            }
        }
    })
}

const userLogin = (req,res,next) => {

   console.log(req.user);
   console.log("User finally logged in");
   let userID = req.user._id;

   res.redirect(`/home/${userID}`);
}

const homePage = (req,res,next) =>{

    console.log("You are in the home Page now"); 
    console.log(req.user);
    console.log(req.session)
    let name = req.user.name;
    let userID = req.user._id;
    
    res.render('home',{
        name: name,
        userID: userID
    });
}

const logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err)
            throw err;
        else    
        res.redirect('/')
    });
    console.log("Finally logged out from account");
    
}


module.exports = {
    registerPage: registerPage,
    signUp: signUp,
    userLogin: userLogin,
    homePage: homePage,
    loginPage: loginPage,
    logout:logout
}