import express from "express";
const hotelRouter = express.Router();
import {register,updateHotel,deleteHotel,getHotel,getallHotels} from "../controllers/HotelControllers.js";



hotelRouter.post("/register",register);
hotelRouter.put("/update/:id",updateHotel);
hotelRouter.delete("/delete/:id",deleteHotel);
hotelRouter.get("/getHotel/:id",getHotel);
hotelRouter.get("/getAllhotels",getallHotels);


export default hotelRouter;


