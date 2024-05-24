import express from "express";

import {
  createJob,
  getAllJobs,
  getAllJobsByRecruiterId,
  getJobById,
  searchJob,
} from "../controllers/jobsController.js";
import { uploadLogo } from "../utils/multerConfig.js";

const jobRouter = express.Router();

jobRouter
  .route("/:id")
  .post(uploadLogo.single("logo"), createJob)
  .get(getAllJobsByRecruiterId);

jobRouter.route("/job/:id").get(getJobById);

jobRouter.route("/").get(getAllJobs).get(searchJob);

export default jobRouter;
