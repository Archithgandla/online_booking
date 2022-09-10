import bcrypt from "bcrypt";
import userModel from "../models/User.js";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function userRegistration(req,res){
    const {username,password,email} = req.body;

    const user = await userModel.findOne({username:username});

    if(user){
        res.json({"status":"failed","message":"Email Already registered" });
    }
    else{
        if(username && password && email){

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);


                try{
                    const doc = new userModel({
                        username:username,
                        username:username,
                        password:hashPassword,
                        email:email
                    });

                    await doc.save();

                    //console.log(username);
                    
                    const saved_user = await userModel.findOne({username:username});


                    //Creating JWT Token
                    //const token = jwt.sign({userID:saved_user._id},process.env.JWT_KEY,{expiresIn : '2d'});




                    res.json({"status":"Success","message":"User Registered succesfully",saved_user});
                }
                catch(error){
                   console.log(error);
                   res.json({"status":"failed","message":"Failed to register"});
                }

        }

    }

}


async function userLogin(req,res,next){
    const {username,password} = req.body;

    console.log(req.body);

    if(username && password){
        try{
            const user = await userModel.findOne({username:username});

            if(user != null){
                const isMatch = await bcrypt.compare(password,user.password);

                if(user.username === username && isMatch === true){
                    console.log(user);
                    const {password,isAdmin,...otherDetails} = user._doc;
                    const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT,{expiresIn : '2d'});

                    res.
                    cookie("access_token",token,{
                        httpOnly:true
                    })
                    .json({"status":"Suceess",...otherDetails});
                }
                else{
                    next(new createError(400,"username or password is incorrect"));
                }

    
            }
            else{
                next(new createError(400,"user not registered"));
            }
        }
        catch(error){
            next(error);   
        }
    }
    else{
        next(new createError(400,"All fields are required"));
    }
}



export {userRegistration,userLogin};