const mongoose = require('mongoose');
//reset password model
const schema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    user:{type:mongoose.Types.ObjectId, ref:"User",required:true},
    expireTime:{
        type:Date,
        required:true,
    }
});

schema.static.verifyToken = async function(token){
    try{
        const filed = await model.findOne({token});
        if(!filed || filed.expireTime<=Date.now()){
            return false;
        }
        return true
    }catch(err){
        throw new Error(err)
    }
}
//cratre model for reset password
const model = mongoose.model('ResetPassword',schema);

//export model
module.exports = model;