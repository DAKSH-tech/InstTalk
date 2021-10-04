const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User=require('../models/user');
//Here we are finding the user and passing next 
passport.use(new LocalStrategy({
    usernameField: 'email',
    //It passes first call as request
    passReqToCallback:true
},function(req,email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { 
        req.flash('error',err);
        return done(err); }
      if (!user || user.password!=password) {
        req.flash('error','Invalid user name/pass');
        return done(null, false);
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in deser",err);
            done(err);
        }
        return done(null,user);
    })
})
passport.checkAuthentication=function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/users/signIn');
}
passport.setAuthenticatedUser=function(req,res,next){
  
  if( req.isAuthenticated()){
    res.locals.user=req.user;
  }
  next();
}
module.exports=passport;