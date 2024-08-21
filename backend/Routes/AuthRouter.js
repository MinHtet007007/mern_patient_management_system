import express from "express";
import { register, login, logout } from "../Controllers/AuthController.js";

const AuthRouter = express.Router();

AuthRouter.post("/login", login);
AuthRouter.post("/register", register);
AuthRouter.post("/logout", logout);

export default AuthRouter;
