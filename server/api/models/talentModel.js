import mongoose from "mongoose";

const talentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Names are required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
    },

    jobSearchStatus: { type: String, default: "open" },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    applicationID: { type: mongoose.Schema.Types.ObjectId, ref: "Applicaion" },

    status: { type: String, default: "pending" },
    location: String,
    designation: String,
    bio: String,
    cvs: String,
    profileImg: String,
  },
  { timestamps: true }
);

const Talent = mongoose.model("Talent", talentSchema);
export default Talent;
