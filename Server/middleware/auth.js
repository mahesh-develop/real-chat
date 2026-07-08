import User from "../models/User.js";
import Jwt from "jsonwebtoken";

// middleware protect route
export const protectRoute = async (req, res, next)=> {
    try{
        const token = req.headers.token;
         
        const decoded = Jwt.verify(token, process.env.JWT_SECRET)
       
        const user = await User.findById(decoded.userID).select("-password");

        if(!user) return res.json({success: false, messagge: "User not found"});

        req.user = user;
        next();
    }catch (error){

        console.log(error.message)
        res.json({success: false, messagge: "User not found"});
    }

}