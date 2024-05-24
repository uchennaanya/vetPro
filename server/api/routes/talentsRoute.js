import express from "express";

import {
  createTalent,
  getTalents,
  getTalent,
  updateTalent,
  deleteTalent,
  login,
  verifyTalent,
  downloadFile,
  confirmTalent,
} from "../controllers/talentController.js";

import { uploadCv, uploadProfileImg } from "../utils/multerConfig.js";

const talentRouter = express.Router();

talentRouter
  .route("/")
  .post(uploadCv.single("cv"), createTalent)
  .get(getTalents);

talentRouter.route("/login").post(login);

talentRouter
  .route("/:id")
  .get(getTalent)
  .patch(uploadProfileImg.single("profileImg"), updateTalent)
  .delete(deleteTalent);

talentRouter.route("/download/:id").get(downloadFile);

talentRouter.route("/verify/:id").patch(confirmTalent);

export default talentRouter;
