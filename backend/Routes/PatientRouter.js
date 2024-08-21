import express from "express";
import { all, destroy, edit, store, update } from "../Controllers/PatientController.js";
import { checkAuth } from "../Middleware/CheckAuth.js";

const PatientRouter = express.Router();

// PatientRouter.use(checkAuth);

PatientRouter.get("/", all);
PatientRouter.post("/", store);
PatientRouter.get("/:id", edit);
PatientRouter.put("/:id", update);
PatientRouter.delete("/:id", destroy);

export default PatientRouter;
