const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res){
    let posts=await Post.find({}).sort('-createdAt').populate('user').populate
    ({
        path:'comment',
        populate:{
            path: 'user'
        }
    });
    return res.json(200,{
        message:'List of posts',
        posts:posts
    });
}
module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        //.id means converting object id into string
       // if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
                return res.json(200,{
                        message:"post deleted"
                });
              //  req.flash('success','Post deleted');
    //     }else{
    //         req.flash('success','Cant deleted');
    //         return res.redirect('back');
    //     }
        
    }
     catch(err){
         console.log("cvfv");
        return res.json(500,{
            message:"Error in post deleting"
    });
        
    }
    
}