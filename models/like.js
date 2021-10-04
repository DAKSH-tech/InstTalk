//Mongoose has dynamic feature via you can refer to differnet document depending on which likes has benn placed on
const mongoose=require('mongoose');
const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    //this defines the object id of linked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:'onModel'
    },
    //this field is used for defining the type of linked object since this is dynamic refernce
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});
const Like=mongoose.model('Like',likeSchema);
module.exports=Like;