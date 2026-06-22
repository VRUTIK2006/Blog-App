import express from 'express';
import upload from '../middlewares/upload.js';
import protect from '../middlewares/protect.js';
import { createBlog } from '../controllers/BlogController.js';
import Blog from '../models/Blog.js';

const router = express.Router();

router.get('/createblog',(req,res)=>{
    res.render("creatBlog");
});
router.get('/fullblog/:id',async(req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id);
        res.render("fullBlog",{blog,isAuth:req.isAuth})
    } catch (error) {
        res.status(404).send("Blog not found");
    }
})
router.post("/createblog",protect,upload.single("coverPhoto"),createBlog);

export default router;