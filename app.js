const express = require('express');
const mongoConnect = require('./database/db_connection.js')

const app = express();



app.listen(3000,function(){
    console.log("Server Running");
});

