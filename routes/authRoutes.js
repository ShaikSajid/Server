const passport=require('passport');

module.exports=app=>{
    app.get('/oauth/google',passport.authenticate('google',{scope:['profile','email']}));
app.get('/auth/google/callback',passport.authenticate('google'));
}
