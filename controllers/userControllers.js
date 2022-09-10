import express from "express";
import userModel from "../models/User.js";
import createError from "../utils/error.js"



//Updating user
async function updateUser(req,res,next){
    try{
        //console.log(req.body);
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        return res.status(200).json(updatedUser);
    }
    catch(error){
        return next(error);
    }
}


//Deleting user
async function deleteUser(req,res,next){
    try{
        //console.log(req.body);
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({"message":"User has been deleted"});
    }
    catch(error){
        next(new createError(500,"cannot find ID"));
    }
}

//fetch a particular user
async function getUser(req,res){
    try{
        //console.log(req.body);
        const User = await userModel.findById(req.params.id);
        res.status(200).json(User);
    }
    catch(error){
        res.status(500).json(error);
    }
}

//fetch all users
async function getallUsers(req,res){
    try{
        //console.log(req.body);
        const users = await userModel.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json(error);
    }
}


export {updateUser,deleteUser,getUser,getallUsers};

