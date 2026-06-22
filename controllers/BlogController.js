import Blog from "../models/Blog.js"

export const createBlog = async(req,res)=>{
    try {
        const blog=await Blog.create({
            title:req.body.title,
            content:req.body.content,
            coverPhoto:req.file.filename,
            author:req.user.id
        });
        
        console.log("Body:", req.body);
        console.log("File:", req.file);
        res.redirect('/api/user/home');
    } catch (error) {
        res.status(500).json({message:"Error creating blog"});
    }
}