import Application from "../models/applicationModel.js";
import Jobs from "../models/jobsModel.js";

export const apply = async (req, res) => {
  try {
    const job = await Jobs.findOne({ _id: req.params.id });

    const application = await Application.create({
      ...req.body,
      recruiterID: job.recruiterID,
      jobID: req.params.id,
    });

    console.log(application);

    return res.json({
      success:
        "Successfully applied to the the job We will get back to via email stay tuned",
      response: "You have already applied to this JOB",
    });
  } catch (error) {
    if (error.code === 11000) {
      console.log(error.code);
      return {
        error: "Error",
        response: "Assignment with the same jobId and userId already exists.",
      };
    } else {
      console.error(error);
      return {
        success: false,
        message: "An error occurred while creating the assignment.",
      };
    }
  }
};

export const getAllApplications = async (req, res) => {
  try {
    let getApplications = await Application.find({}).populate("jobID");
    if (getApplications.length === 0)
      return res
        .status(404)
        .json({ error: "Error", response: "No application found" });

    return res.json({
      size: getApplications.length,
      success: "Success",
      response: getApplications,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      response: "Something went wrong",
    });
  }
};

export const getAllApplicationForAJob = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const applicationForAJob = await Application.find({
      recruiterID: id,
    })
      .populate("jobID")
      .populate("talentID")
      .populate("userID");

    console.log(applicationForAJob);

    if (!applicationForAJob)
      return res
        .status(404)
        .json({ error: "Error", response: "No applicatins yet" });

    return res.json({
      success: "Success",
      response: applicationForAJob,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      response: "Something went wrong",
    });
  }
};

export const getApplication = async (req, res) => {
  try {
    let getApplication = await Application.findById({
      _id: req.params.id,
    }).populate("userID");

    if (!getApplication)
      return res
        .status(404)
        .json({ error: "Error", response: "Application with ID not found" });
    return res.json({
      success: "Success",
      response: getApplication,
    });
  } catch (err) {
    console.log(err.name);
    res.status(500).send({
      error: err.message,
      response: "Somthing went wrong",
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.json({
      success: true,
      response: "Updated succesfully",
    });
  } catch (err) {
    return res.json({
      error: "Error",
      response: err.message,
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete({ _id: req.params.id });
    return res.json({
      message: "Success",
      response: "Deleted successfully",
    });
  } catch (err) {
    console.log(err.name);
    return res.status(500).json({
      error: "Error",
      response: "Failed to delete",
    });
  }
};
