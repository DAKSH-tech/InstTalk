const mongoose=require('mongoose');
const env=require('./enviroment');

mongoose.connect('mongodb://localhost/codeial_development', 
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!'); 
});
module.exports=db;
