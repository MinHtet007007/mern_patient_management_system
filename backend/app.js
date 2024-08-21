import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRouter from "./Routes/AuthRouter.js";
import PatientRouter from "./Routes/PatientRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import VolunteerRouter from "./Routes/VolunteerRouter.js";

const app = express();

//config
dotenv.config();

// db setup
const mong_url = process.env.MONGO;
mongoose.connect(mong_url).then(() => {
  console.log("db connected");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server running on port:" + port);
});

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//route middleware
app.use("/api", AuthRouter);
app.use("/api/patient", PatientRouter);
app.use("/api/volunteer", VolunteerRouter);

//test
app.get("/", (req, res) => {
  res.send("hello");
});
