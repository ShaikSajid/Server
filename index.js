const express=require('express');
const mongoose=require('mongoose');
const key=require('./config/keys');
require('./models/users');
require('./services/passport');

//const authRoutes=require('./routes/authRoutes');
console.log(key.mongooseURI);
mongoose.Promise=global.Promise;
mongoose.connect(key.mongooseURI,(err,client)=>{
    if(err){
        return console.log(err);
    }
    console.log('connected...')
});
   // mongoose.connect(key.mongooseURI,{useNewUrlParser: true});

const app=express();
//authRoutes(app); is equals to below
require('./routes/authRoutes')(app);

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{console.log("server started at port"+PORT)});