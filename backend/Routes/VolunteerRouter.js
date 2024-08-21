import express from "express";
import { checkAuth } from "../Middleware/CheckAuth.js";
import { all } from "../Controllers/VolunteerController.js";

const VolunteerRouter = express.Router();

// VolunteerRouter.use(checkAuth);

VolunteerRouter.get("/", all);

export default VolunteerRouter;
