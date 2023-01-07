const user = require('../../models/userProfile');

const registerPage = (req,res,next) =>{
    res.send("Welcome to the Register Page");
}

const signUp = (req,res,next) =>{

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
                res.send("User Registerd");
            }
        }
    })
}

const userLogin = (req,res,next) => {

    let username = req.body.username;
    let password = req.body.password;

    let query = {username: username, password: password};
    user.find(query,(err,result)=>{
        if(err)
            throw err;
        else
        {
            if(result.length>0)
                res.send("Welcome to the login Page");
            else    
                res.send("User doesnot exist. Please register!")
        }        
    })
}

const homePage = (req,res,next) =>{
    res.send("You are in the home Page now"); 
}


module.exports = {
    registerPage: registerPage,
    signUp: signUp,
    userLogin: userLogin,
    homePage: homePage
}