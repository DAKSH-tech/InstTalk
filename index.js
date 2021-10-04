const express=require('express');
const app=express();
//const env=require('./config/enviroment');
const port=8000;
const dotenv=require('dotenv').config();
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const db=require('./config/mongoose');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
//const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
//set up chat box
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000, function (error) {
    if (error) {
      console.log("Error in setting up Chat Server");
    } else {
      console.log("Chat Server is listening on port 200");
    }
  });
const path=require('path');
app.use(sassMiddleware({
    src: './assets/scss',//path.join(__dirname,env.asset_path,'scss'), 
    dest: './assets/css',// path.join(__dirname,env.asset_path,'css'),
    debug:true,
    outputStyle: 'extended',
    prefix: '/css'
}))
console.log('chat server is running on port 5000');
//For reading the post data
app.use(express.urlencoded());
//For reading and writing cookies
app.use(cookieParser());
//Express function of static files for ejs 
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));
//Express Layouts
app.use(expressLayouts);
// Extracting property
app.set('layout extractStyles',true);
app.set('layout extractScript',true);

//Setting view engine and view folder so that controller can easily access
app.set('view engine','ejs');
app.set('views','./views');
//Express session for cookies
app.use(session({
    name:'codeial',
    //To do change secret before deplyment in production  mode
    secret: process.env.secret,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        // This is interpolation=Embed the variable in string
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`)
});