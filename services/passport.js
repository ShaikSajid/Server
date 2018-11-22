const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const mongoose=require('mongoose');
const keys=require('../config/keys.js');

const User=mongoose.model('users');

passport.use(
    new GoogleStrategy(
{
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{

    User.findOne({googlId:profile.id}).then(existingUser=>{
        if(existingUser){
          console.log('user already exist...')  
        }else{
            new User({googlId:profile.id}).save(function (err) {
                if (err) return handleError(err);
                console.log('user inserted..')              });
        }
    });

//console.log('accessToken :'+accessToken);
//console.log('refreshToken :',refreshToken);
//console.log('profile :',profile);
}
)
);