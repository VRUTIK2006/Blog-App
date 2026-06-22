import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './config/connect.js'
import userRoutes from './routers/UserInfoRoutes.js'
import blogRoutes from './routers/BlogRoutes.js'

const app = express();
const PORT = 3000;
connectDB();

app.set("view engine",'ejs');

app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.static('public'));

app.use("/api/user",userRoutes);
app.use("/api/blog",blogRoutes);
app.listen(PORT,()=>{
    console.log(`Server Started on : ${PORT}`);
});