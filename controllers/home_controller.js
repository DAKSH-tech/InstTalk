const Post=require('../models/post');
const User=require('../models/user');
// module.exports.display=function(req,res){
//     Post.findById(req.params.id,function(err,post){
//         let comment=post.comment;
//         if(err){
//             console.log('can not display comment');
//             return ;
//         }
//         return res.render('home',{
//             title: 'Home',
//                posts:posts,
//                all_users:users,
//                comments:comment
//         })
//     })
// }
module.exports.home=async function(req,res){
    //console.log(req);
    // console.log(req.cookies);
    // res.cookie('user_id',25);

//      Post.find({}).populate('user').populate
//      ({
//          path:'comment',
//          populate:{
//              path: 'user'
//          }
//      })
//      .exec(function(err,posts){
//          User.find({},function(err,users){
//             return res.render('home',{
//                 title: 'Home',
//                 posts:posts,
//                 all_users:users
//             });
//          })
            
//    })
  try{
      //change::populate likes of each post and comment
    let posts=await Post.find({}).sort('-createdAt').populate('user').populate
    ({
        path:'comment',
        populate:{
            path: 'user'
        },populate:{
            path: 'likes'
        }
    }).populate('likes');
    
      let users= await User.find({});
      
           return res.render('home',{
               title: 'Home',
               posts:posts,
               all_users:users,
           });
     
  }catch(err){
      console.log('Error',err);
      return;
  }
  
}