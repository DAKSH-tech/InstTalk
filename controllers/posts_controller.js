const Post=require('../models/post');
const User=require('../models/user');
const Comment=require('../models/comment');
const Like=require('../models/like');
module.exports.createPost=async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post Created"
            });
        }
        req.flash('success','Post Created');
        return res.redirect('back');
    }catch(err){
        console.log('Error in creating posts');
        return;
    }
}

module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        //.id means converting object id into string
        if(post.user == req.user.id){
            await Like.deleteMany({likeable:post,onModel: 'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            req.flash('success','Post deleted');
                return res.redirect('back');
                
        }else{
            req.flash('success','Cant deleted');
            return res.redirect('back');
        }
        
    }
    catch(err){
        console.log('Error in creating posts');
        return;
    }
    
}