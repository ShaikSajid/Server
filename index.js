const express=require('express');
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./config/keys.js');

passport.use(
    new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
})
);

const app=express();

app.get('/',(req,res)=>{
res.send('<h2>Hello</h2>');
});

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{console.log("server started at port"+PORT)});