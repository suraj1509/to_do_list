const mongoose = require('mongoose');
mongoose.set('strictQuery',true);

const mongoURI="mongodb+srv://admin:admin@cluster0.iai3ebb.mongodb.net/to_do_list"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("DB Connection Successful")
    })
}


module.exports = connectToMongo;