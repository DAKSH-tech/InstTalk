const passport=require('passport');
const env=require('./enviroment');
const JWTStrategy=require('passport-jwt').Strategy;
//it will extraxt data from token
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
let opts={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret:process.env.secretkey
}
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
   User.findById(jwtPayLoad._id,function(err,user){
       if(err){
           console.log('Error in finding user from JWT');return;
       }
       if(user){
           return done(null,user);
       }else{
           return done(null,f );
       }
   })
}));
module.exports=passport;