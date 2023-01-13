const user = require('../../models/userProfile');

const registerPage = (req,res,next) =>{
    
    console.log("Welcome to the Register Page");
    res.render('register');
}

const loginPage = (req,res,next) =>{
    console.log("You are in the login Page");
    res.render('login');
}
const signUp = (req,res,next) =>{

    console.log("User got registered")
    let username = req.body.username;
    let password = req.body.password;

    const newUser = new user({
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
                res.send("User exists!");
            else
            {
                await newUser.save();
                res.redirect('/');
            }
        }
    })
}

const userLogin = (req,res,next) => {

    // let username = req.body.username;
    // let password = req.body.password;

    // let query = {username: username, password: password};
    // user.find(query,(err,result)=>{
    //     if(err)
    //         throw err;
    //     else
    //     {
    //         if(result.length>0)
    //             res.send("Welcome to the login Page");
    //         else    
    //             res.send("User doesnot exist. Please register!")
    //     }        
    // })
   console.log(req.user);
   console.log("User finally logged in");
   let userID = req.user._id;

   res.redirect(`/home/${userID}`);
}

const homePage = (req,res,next) =>{

    console.log("You are in the home Page now"); 
    let username = req.user.username;
    let userID = req.user._id;
    
    res.render('home',{
        name: username,
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