import mongoose from "mongoose";
const connectDB = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/blog-app'
    ).then(console.log("MongoDB Connected..."));
};

export default connectDB;

