const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');
//For Sign Up Page to display
router.get('/signUp',usersController.signUp);
// For Sign In Page to display
router.get('/signIn',usersController.signIn);
//For Profile Page to display passport.checkAuthentication
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
//For Sign Up creating identity
router.post('/create',usersController.create);
//use passport as middleware for authentication
router.post('/createSession',passport.authenticate(
    'local',{failureRedirect: '/users/signIn'},
),usersController.createSession);
router.get('/signOut',usersController.destroySession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/signIn'}),usersController.createSession)
module.exports=router;