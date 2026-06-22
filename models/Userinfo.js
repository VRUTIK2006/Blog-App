import mongoose from 'mongoose';
const Userschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String
    }
},{
    timestemps:true
});
export default mongoose.model("Userinfo",Userschema);