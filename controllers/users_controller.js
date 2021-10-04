const User = require("../models/user");

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        console.log(user);
        return res.render('user_profile',{
            title: 'Profile',
            profile_user:user
      });
    })
}
// module.exports.update=function(req,res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
//                   return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('Unauthorized');
//     }
// }
module.exports.update=async function(req,res){
    if(req.user.id ==req.params.id){
try{
    let user=await User.findById(req.params.id);
    User.uploadedAvatar(req,res,function(err){
            if(err){
                conosle.log('*****Multer Error',err);
            }
            //console.log(req.body);
            user.name=req.body.name;
            user.email=req.body.email;
            if(req.file){
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                //this is saving the path of upload file into avavtar field of user
                user.avatar=User.avatarPath+'/'+req.file.filename;
            }
            user.save();
            return res.redirect('back');
    });
}catch(err){
    req.flash('error',err);
    return res.redirect('back');
}
    }else{
        req.flash('error',err);
        return res.status(401).send('Unauthorized');
    }
}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Sign-Up'
    });
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Sign-In'
    });
}
module.exports.create=function(req,res){
     if(req.body.password !=req.body.confirm_password){
         return redirect('back');
     }
     User.findOne({email:req.body.email},function(err,user){
           if(err){
               console.log('error in finding user in signing up');
               return res.redirect('back');
           }
           if(!user){
               User.create(req.body,function(err,user){
                if(err){
                    console.log('error in finding user in signing up');
                    return;
                }
                    return res.redirect('/users/signIn');
                })
            }else{
                   return res.redirect('back');
                }
           
     })
}
module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
}