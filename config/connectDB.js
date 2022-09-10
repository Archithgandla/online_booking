import mongoose from "mongoose";

async function connectDB(DB_URL){
    try{
        const DB_OPTIONS = {
            dbName : "Online_booking"
        }

        await mongoose.connect(DB_URL,DB_OPTIONS);
        console.log("connected to databse succesfully");

    }catch(error){
        console.log(error);
    }
}

export default connectDB;