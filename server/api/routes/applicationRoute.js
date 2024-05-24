import express from "express";

import {
  apply,
  getAllApplications,
  getApplication,
  updateApplication,
  deleteApplication,
  getAllApplicationForAJob,
} from "../controllers/applicationController.js";

const talentRouter = express.Router();

talentRouter.route("/").get(getAllApplications);

talentRouter
  .route("/:id").post(apply).get(getApplication).patch(updateApplication).delete(deleteApplication);

talentRouter.route("/recruiterapplications/:id").get(getAllApplicationForAJob);

export default talentRouter;
