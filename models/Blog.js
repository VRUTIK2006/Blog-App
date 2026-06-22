import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    coverPhoto:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Userinfo"
    }
},{
    timestamps:true
});

export default mongoose.model("Blog",blogSchema)