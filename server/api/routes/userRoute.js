import express from "express";

import {
  allUser,
  currentUser,
  logInUser,
  registerUser,
  userStat,
  userRole,
  deleteUser,
  updateUser,
  protect,
  restrictMulti,
  resetPassword,
  forgotPassword,
  hireTalent,
  confirmRecruiter,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/userstat").get(userStat);
userRouter.route("/usersrole/:role").get(userRole);

userRouter.route("/").post(registerUser).get(allUser);
userRouter.route("/forgotpassword").post(forgotPassword);
userRouter.route("/resetpassword/:token").patch(resetPassword);
userRouter
  .route("/:id")
  .get(currentUser)
  .delete(protect, restrictMulti("admin", "recruiter"), deleteUser)
  .patch(updateUser);

userRouter.route("/hiretalent/:id").patch(hireTalent);
userRouter.route("/verify/:id").patch(confirmRecruiter);
userRouter.route("/login").post(logInUser);
export default userRouter;
