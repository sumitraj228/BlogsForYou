const user = require('../../models/userProfile');

const registerPage = (req,res,next) =>{
    
    res.render('register',{
        failure: false
    });
}

const loginPage = (req,res,next) =>{
    res.render('login');
}

const signUp = (req,res,next) =>{

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

   let userID = req.user._id;
   res.redirect(`/home/${userID}`);
}

const homePage = (req,res,next) =>{
  
    if(('user' in req))
    {   
        let name = req.user.name || '';
        let userID = req.user._id;
        
        res.render('home',{
            name: name || '',
            userID: userID
        });
    }
    else    
        res.redirect('/');
}

const logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err)
            throw err;
        else    
        res.redirect('/')
    });
    
}


module.exports = {
    registerPage: registerPage,
    signUp: signUp,
    userLogin: userLogin,
    homePage: homePage,
    loginPage: loginPage,
    logout:logout
}