import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js" ;
import hotelRouter from "./routes/hotels.js";
import roomsRouter from "./routes/rooms.js"; 
import userRouter from "./routes/users.js";
import connectDB from "./config/connectDB.js"
import cookieParser from "cookie-parser";



dotenv.config();

const app = express();
const PORT = process.env.PORT||4000;

//Middlewares
app.use(cookieParser());
app.use(express.json());




//Routes
app.use("/api/auth",authRouter);
app.use("/api/hotel",hotelRouter);
app.use("/api/room",roomsRouter);
app.use("/api/user",userRouter);

app.use(function(err,req,res,next){
    const errorStatus = err.status||500;
    const errorMessage = err.message||"something went wrong";
    //console.log("hello");

    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack 
    });

})



app.listen(PORT,function(req,res){
    connectDB(process.env.DB_URL);
    console.log("Server started listening on port number 3000")
})

