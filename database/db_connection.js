// CONNECT MONGO DATABASE
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('strictQuery', false);

const mongoConnect = mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser: true,
},(err)=>{
    if(err)
        console.log("Database is not connected", err);
    else   
        console.log("Database connected");
});

module.exports = {
    mongoConnect: mongoConnect
}



