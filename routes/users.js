import express from "express";
const userRouter = express.Router();
import {updateUser,deleteUser,getUser,getallUsers} from "../controllers/userControllers.js";
import {verifyToken,verifyUser,verifyAdmin} from "../utils/authentication.js";

userRouter.get("/verifyToken",verifyToken,function(req,res){
    res.send("user Logged in");
});

userRouter.get("/verifyUser/:id",verifyUser,function(req,res){
    res.send("user can manipulate");
});


userRouter.put("/update/:id",verifyUser,updateUser);
userRouter.delete("/delete/:id",verifyUser,deleteUser);
userRouter.get("/getUser/:id",verifyUser,getUser);
userRouter.get("/getAllUsers",verifyAdmin,getallUsers);


export default userRouter;


