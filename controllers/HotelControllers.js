import express from "express";
import HotelModel from "../models/Hotel.js";
import createError from "../utils/error.js"

//creating Hotel
async function register(req,res,next){
    try{
        const newHotel = new HotelModel(req.body);
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }
    catch(error){
        next(error);
    }

}


//Updating Hotel
async function updateHotel(req,res,next){
    try{
        //console.log(req.body);
        const updatedHotel = await HotelModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        return res.status(200).json(updatedHotel);
    }
    catch(error){
        return next(error);
    }
}


//Deleting Hotel
async function deleteHotel(req,res,next){
    try{
        //console.log(req.body);
        await HotelModel.findByIdAndDelete(req.params.id);
        res.status(200).json({"message":"Hotel has been deleted"});
    }
    catch(error){
        next(new createError(500,"cannot find ID"));
    }
}

//fetch a particular hotel
async function getHotel(req,res){
    try{
        //console.log(req.body);
        const hotel = await HotelModel.findById(req.params.id);
        res.status(200).json(hotel);
    }
    catch(error){
        res.status(500).json(error);
    }
}

//fetch all hotels
async function getallHotels(req,res){
    try{
        //console.log(req.body);
        const hotels = await HotelModel.find();
        res.status(200).json(hotels);
    }
    catch(error){
        res.status(500).json(error);
    }
}


export {register,updateHotel,deleteHotel,getHotel,getallHotels};

