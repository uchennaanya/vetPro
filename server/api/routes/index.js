import express from "express";
import userRouter from "./userRoute.js";
import jobRouter from "./jobsRoute.js";
import talentsRouter from "./talentsRoute.js";
import applicaionRouter from "./applicationRoute.js";

const router = express.Router();

router.use("/api/user", userRouter);
router.use("/api/jobs", jobRouter);
router.use("/api/talent", talentsRouter);
router.use("/api/application", applicaionRouter);

export default router;
