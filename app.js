const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./database/db_connection.js')
const user = require('./models/userProfile');

const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())

const apis = require('./backend/apis.js')(app);


app.listen(3000,function(){
    console.log("Server Running");
});

