const mongoose=require('mongoose');
const User=require('./user')
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include the array of ids of all ccomment in this post schema itself
    comment:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref:'Comment'
          }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true
});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;