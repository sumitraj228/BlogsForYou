const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userProfile');

const verifyCallback = (username,password,done) =>{

    User.find({username:username,password:password})
    .then((user)=>{
        if(!user)
            return done(null,false);
        return done(null,user[0]);
    })
    .catch((err)=>{
        return done(err);
    })

}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user,done)=>{
     done(null,user.id);
});

passport.deserializeUser((userID,done)=>{
    User.findById(userID)
    .then((user)=>{
         done(null,user);
    })
    .catch((err)=>{ done(err)});
});


