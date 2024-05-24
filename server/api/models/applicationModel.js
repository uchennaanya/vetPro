import mongoose, { Schema } from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },

    isApplied: { type: String, default: "applied" },
    recruiterID: {type: String},
    
    userID: { type: Schema.Types.ObjectId, ref: "User" },
    jobID: { type: Schema.Types.ObjectId, ref: "Job" },
    talentID: { type: Schema.Types.ObjectId, ref: "Talent" },
  },

  { timestamps: true }
);

applicationSchema.index({ jobID: 1, talentID: 1 }, { unique: true });
const Application = mongoose.model("Applicaion", applicationSchema);
export default Application;
