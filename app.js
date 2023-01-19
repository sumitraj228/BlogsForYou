const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoConnect = require('./database/db_connection.js');
const passport = require('passport');

dotenv.config()
const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())

app.set('view engine', 'ejs');

const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_CONNECT,
    collection: "sessions"
})

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000*60*60*24
    }
 
}))

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());


const apis = require('./backend/apis.js')(app);


app.listen(3000,function(){
    console.log("Server Running");
});

