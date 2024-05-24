import Jobs from "../models/jobsModel.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const createJob = async (req, res) => {
  const { jobTitle, from, companyName } = req.body;

  try {
    if (!jobTitle || !from || !companyName)
      return res.json({
        error: "Error",
        response: "Required fields are missing",
      });

    if (!req.file)
      return res.json({ error: "Error", response: "No file uploaded" });

    const img = req.file.path;

    const newJob = await Jobs.create({
      ...req.body,
      userID: req.params.id,
      logo: img,
    });

    res.status(201).json({
      success: "Success",
      response: "Job added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error", response: error.message });
  }
};

// export const createJob = async (req, res) => {
//   const { jobTitle, from, companyName } = req.body;

//   try {
//     if (!jobTitle || !from || !companyName)
//       return res.json({
//         error: "Error",
//         response: "Required fields are missing",
//       });

//     if (!req.file)
//       return res.json({ error: "Error", response: "No file uploaded" });
//     const img = req.file.filename;
//     await Jobs.create({
//       ...req.body,
//       // userID: req.params.id,
//       recruiterID: req.params.id,
//       logo: img,
//     });

//     res
//       .status(201)
//       .json({ success: "Success", response: "Job added successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error", response: error.message });
//   }
// };

export const getAllJobsByRecruiterId = async (req, res) => {
  console.log("Just checking ");
  try {
    const jobs = await Jobs.find({ userID: req.params.id });

    res
      .status(200)
      .send({ totalNum: jobs.length, success: "Success", response: jobs });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  console.log("Just another thing ");
  try {
    const job = await Jobs.findById({ _id: req.params.id }).populate("userID");

    res.status(200).send(job);
  } catch (error) {
    console.log(error);
  }
};

export const getJobByuserIDandJobID = async (req, res) => {
  console.log("Just another thing ");
  try {
    const job = await Jobs.findById({ _id: req.params.id }).populate("userID");

    res.status(200).send(job);
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const features = new ApiFeatures(Jobs.find(), req.query)
      .countDocuments()
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const jobs = await features.query;
    // Get the total count of records
    let totalCount = await features.totalCountPromise;

    if (!jobs) throw Error("No job found");

    res.status(200).json({
      success: "Success",
      RecordsEstimate: totalCount,
      lenght: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Error", response: error.message });
  }
};

// search
export const searchJob = async (req, res) => {
  const searchQuery = req.query;
  await Jobs.createIndexes({ jobTitle: "text", location: "text" });
  const jobs = await Jobs.find({
    $text: {
      $search: searchQuery,
    },
  });

  res.status(200).json({ success: "Success", response: jobs });
};
