import jwt from 'jsonwebtoken';
const secretkey="secret123"
const protect = (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
       req.isAuth=false;  
       next(); 
    }
    else{
        try {
        const decode = jwt.verify(token,secretkey);
        req.user = decode;
        req.isAuth=true;
        next();
    } catch (error) {
        return res.status(401).json({
            message:"invalid Token"
        })
    }
    }
    
};

export default protect;