const Comment=require('../models/comment');
const Post=require('../models/post');
const User=require('../models/user');
const commentsMailer=require('../mailers/comments_mailer');
const commentEmailWorker=require('../workers/comment_email_workers');
const queue=require('../config/kue');
module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
               
                comment=comment.populate('user','name email').execPopulate();
                post.comment.push(comment);
                post.save();
            //     comment = comment
            // .populate
            // ({
            //     path: 'user',
            //     model: 'User',
            //     populate:
            //     {
            //         path: 'user',
            //         model: 'User'
            //     }
            // })
            // .execPopulate();
               // commentsMailer.newComment(comment);
                // let job=queueMicrotask.create('email',comment).save(function(err){
                //      if(err){
                //          console.log('error in creating job');
                //      }
                //      console.log(job.id);
                // })
               
                res.redirect('/');
            });
        }
    });
}
module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id);
    if(comment.user== req.user.id){
        let postId=comment.post;
        comment.remove();
        let post=Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}});
        await Like.deleteMany({likeable:comment._id,onModel: 'Comment'});
        return res.redirect('back');
    }else{
        return res.redirect('back');
    }
    }catch(err){
        console.log('Error',err);
        return;
    }
}
