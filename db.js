const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels1'

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to MongoDb server');
})

db.on('error',(err)=>{
    console.log('MongoDB connection error:',err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

//comment added for test. 
module.exports=db;