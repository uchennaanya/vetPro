import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userName: { type: String, required: [true, "Username is required"] },
    jobTitle: { type: String, required: [true, "Job title is required"] },
    jobType: { type: String, required: [true, "Job type is required"] },
    location: { type: String, required: [true, "Location is required"] },

    //   SALARY RANGE
    from: { type: Number, required: [true, "From is required"] },
    to: { type: Number, required: [true, "To is required"] },
    vacancies: { type: Number, required: [true, "Vacancy is required"] },

    yofexperience: {
      type: Number,
      default: 0,
    },

    companyName: { type: String, required: [true, "Company is required"] },
    desc: { type: String, required: [true, "Job description is required"] },

    requirement: {
      type: String,
      required: [true, "Job requirements is required"],
    },

    recruiterID: { type: String, required: [true, "Recruiter ID is required"] },

    logo: { type: String, required: [true, "Upload company logo"] },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    status: { type: String, default: "open" },
    categories: {
      type: String,
      enum: ["front end", "back end", "ui ux", "wordpress", "qa"],
    },
  },
  { timestamps: true }
);

jobSchema.index({
  jobTitle: "text",
  location: "text",
  categories: "text",
  jobType: "text",
  yofexperience: "text",
});

jobSchema.index({ jobTitle: -1 });

const Job = mongoose.model("Job", jobSchema);

export default Job;
