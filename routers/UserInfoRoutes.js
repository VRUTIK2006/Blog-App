import express from 'express';
import upload from '../middlewares/upload.js';
import {usersignup,userlogin,userlogout,updateProfilePhoto} from "../controllers/UserController.js";
import protect from '../middlewares/protect.js';
import Blog from '../models/Blog.js';

const router = express.Router();

router.get('/home',protect,async(req,res)=>{
    const blogs = await Blog.find().populate("author","name");
    res.render("home",{blogs,isAuth:req.isAuth});
});
router.get('/signup',(req,res)=>{
    res.render("signup");
});
router.get('/login',(req,res)=>{
    res.render("login");
});

router.post('/logout',userlogout,(req,res)=>{
    res.render("logout");
});
router.post('/login',userlogin,async(req,res)=>{
    res.redirect('/api/user/home');
});
router.post('/signup',usersignup,async(req,res)=>{
    res.render("login", { message: "Signup successful, please login." });

});

router.put("/profile-photo",protect,upload.single("profilePhoto"),updateProfilePhoto);
export default router;