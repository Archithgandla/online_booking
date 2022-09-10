import express from "express";
const authRouter = express.Router();
import {userRegistration,userLogin} from "../controllers/authControllers.js"





authRouter.post("/register",userRegistration);
//To check wheter the user's password is correct
authRouter.post("/login",userLogin);

export default authRouter;