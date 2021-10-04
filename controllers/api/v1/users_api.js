const User=require('../../../models/user');
const jsonwebtoken=require('jsonwebtoken');
const env=require('../../../config/enviroment');
module.exports.createSession=function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user || user.password !=req.body.password){
            return res.jsonwebtoken(422,{
                message:"invalid username/password"
            });
        }
        return res.json(200,{
            message:"Sign in succesulfully here is my token keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'10000'})
            }
        })
    }catch(err){
        console.log("*******",err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
   
}