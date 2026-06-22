import Userinfo from "../models/Userinfo.js";
import Blog from "../models/Blog.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secrtkey = "secret123"

const usersignup = async(req,res,next)=>{
    try {
        const {name,email,password} = req.body;
        const user = await Userinfo.findOne({email});
        if(user){
            return res.render("login", { message: "User already has an account..." });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await Userinfo.create({
            name,email,password:hashedPassword
        });
        next();
    } catch (error) {

        res.status(500).json({
            message:"Server Error : ",
            error:error.message
        });
        
    }
};

const userlogin = async (req,res,next)=>{
    try {
        const {email,password}=req.body;

        const user = await Userinfo.findOne({email});

        if(!user){
            return res.render('login',{
            message:"User Not Exists"
            });
        }

            console.log("Entered password:", password);
            console.log("Stored hash:", user.password);
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
            return res.render('login',{
            message:"Wrong Password"
            });
            
        }
        console.log("Password Matched..");
        const token = jwt.sign({
            id:user._id,
            email:user.email,
        },secrtkey);
        req.isAuth = true;
        const blogs = await Blog.find().populate("author","name");
        res.cookie("token",token); 
        next();       
    } catch (error) {
        res.status(500).json({
            message:"Server Error : ",
            error:error.message
        });
        
    }
};

const userlogout = async(req,res,next)=>{
    try {
        await res.clearCookie("token");
        next();
    } catch (error) {
        res.status(500).json({ message: "Error in Log out" });
    }
};

const updateProfilePhoto = async(req,res)=>{
    try {
        const user = await Userinfo.findById(req.user.id);
        if(!user) return res.status(404).json({
            message:"User not Found.."
        });
        user.profilePhoto = req.file.path;
        await user.save();

        res.json({message:"Profile photo Updated",profilePhoto: user.profilePhoto });
    } catch (error) {
        res.status(500).json({ message: "Error updating photo", error: err.message });
    }
}
export {usersignup,userlogin,userlogout,updateProfilePhoto};