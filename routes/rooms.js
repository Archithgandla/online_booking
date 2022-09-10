import express from "express";
const roomsRouter = express.Router();

roomsRouter.get("/",function(req,res){
    res.send("rooms");
})




export default roomsRouter;