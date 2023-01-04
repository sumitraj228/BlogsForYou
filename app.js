const express = require('express');
const mongoConnect = require('./database/db_connection.js')

const app = express();
const apis = require('./backend/apis.js')(app);


app.listen(3000,function(){
    console.log("Server Running");
});

