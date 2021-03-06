const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const mongoose=require('mongoose');
const keys=require('../config/keys.js');
const User=mongoose.model('users');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(
    (id,done)=>{
        User.findById(id).then(user=>{
            done(null,user);
        });
    }
);


passport.use(
    new GoogleStrategy(
{
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
},(accessToken,refreshToken,profile,done)=>{

    User
    .findOne({googlId:profile.id}).then(existingUser=>{
        if(existingUser){
          console.log('user already exist...')  
          done(null,existingUser);
        }else{
            new User({googlId:profile.id}).save(function (err) {
                if (err) return handleError(err);
                console.log('user inserted..')})
                .then(user=>done(null,user));
        }
    });

//console.log('accessToken :'+accessToken);
//console.log('refreshToken :',refreshToken);
//console.log('profile :',profile);
}
)
);