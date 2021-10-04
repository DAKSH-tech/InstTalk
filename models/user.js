const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const Friendship=require('./friendship');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type:String
    },
    friendships:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Friendship'
        }
    ]
 },{
    timestamps:true
}
 );
 let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //in below function path.join we can understand this as : path.join(models+".."+avatar path)
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
    }
  });
 //static functions
 //if we want to upload single file then use single('avatar')
userSchema.statics.uploadedAvatar=multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;//now avatra path is publicly avaible
const User = mongoose.model('User', userSchema);
module.exports=User;
