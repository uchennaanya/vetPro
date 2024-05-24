import User from "../models/userModel.js";
import ApiFeatures from "./../utils/apiFeatures.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
// import CustomError from "../utils/CustomError.js";
import sendEmail from "../utils/email.js";

import jwt from "jsonwebtoken";
import validator from "validator";
import util from "util";
import crypto from "crypto";
import Talent from "../models/talentModel.js";
import Job from "../models/jobsModel.js";
import { error } from "console";
import Application from "../models/applicationModel.js";
import { response } from "express";

// JWT SIGN
const userToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.MY_SECRET, {
    expiresIn: "1d",
  });
};

function isWebmail(email) {
  const webmailDomains = ["gmail.com", "yahoo.com", "outlook.com"];

  const domain = email.split("@")[1];

  return webmailDomains.includes(domain);
}

// REGISTER A USER
export const registerUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
      confirmPassword,
      phone,
      position,
      companyName,
    } = req.body;
    if (
      (!email || !password || !name,
      !confirmPassword,
      !phone,
      !position,
      !companyName)
    ) {
      return res.send({
        response: "A required field is empty",
      });
    }

    if (!validator.isEmail(email))
      return res.send({ error: "Error", response: "A valid email is rquired" });

    if (isWebmail(email))
      return res.json({
        error: "Error",
        response: "You must be a recruiter to do this",
      });

    let userExist = await User.findOne({ email });

    if (userExist) {
      return res.send({
        error: "Error",
        response: "A user already exist with email",
      });
    } else {
      const user = await User.create(req.body);

      let token = userToken(user._id);

      const verifyLink = `https://techwings.onrender.com/userslayout/confirmrecruiter/${user._id}`;

      const message = `Use the link bellow, to verify your email \n\n${verifyLink}\n\nThis link will be valid for 10 minutes`;

      await sendEmail({
        email: email,
        subject: "Confirm your password",
        message: message,
      });

      return res.status(201).send({
        token,
        user,
        success: "User created check your email to comfirm registration",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

export const confirmRecruiter = async (req, res) => {
  const user = await User.find({ _id: req.params.id });

  if (!user)
    return res.status(404).json({ error: "Error", response: "User not found" });

  await User.findByIdAndUpdate(
    { _id: req.params.id },
    { status: "active" },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: "Success", response: "Activated, Login" });
};

export const hireTalent = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  console.log(user, "Checking for the user");
  console.log(req.params.id, "Just the ID");
  console.log(user.email, "User email");

  const applications = await Application.find();

  const jobID = await Job.findOne();
  const talentID = await Talent.findOne();

  if (!user)
    return res
      .json(400)
      .json({ error: "Error", response: "Something went wrong" });

  await Job.findOneAndUpdate(
    { status: "open" },
    { status: "closed" },
    {
      new: true,
      runValidators: true,
    }
  );

  await Talent.findOneAndUpdate(
    { jobSearchStatus: "open" },
    { jobSearchStatus: "hired" },
    {
      new: true,
      runValidators: true,
    }
  );

  console.log(talentID._id, "Talent table");
  console.log(jobID._id, "Job table");

  const message = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          p,
          li {
            font: 300 1rem/1.5rem sans-serif;
          }
          body {
            padding: 1rem 7rem;
          }
          b {
            font: 800 1.1rem/1.5rem sans-serif;
          }
          span,
          .span,
          .a {
            color: rgb(253, 101, 19);
            text-decoration: none;
          }
          .firstDiv {
            width: fit-content;
            margin: 0 auto;
          }
        </style>
      </head>
      <body>
        <div class="firstDiv">
          <b>Company Name:</b><span> TechWings Global LLC, USA.</span><br /><br />
          <b>Platform Name:</b><span> Vetted Professional (VetPro)</span>
        </div>
        <p>
          <b class="span"
            >Next Steps for Hiring Talent through Vetted Professionals (VetPro)</b
          >
        </p>
        <p>
          Thank you for utilizing Vetted Professionals (VetPro) for your hiring
          needs. We are pleased to inform you that your request to hire talent has
          been received and acknowledged. Before we proceed with providing you
          access to the selected candidate, we would like to outline the next steps
          and provide you with important information regarding the hiring process:
        </p>
        <ol>
          <li>
            <b>Confirmation of Hiring Option:</b> As outlined in our platform, you
            have two options for hiring talent:
          </li>
          <ul>
            <li>
              Option 1: Pay a one-time hiring fee of <b> 7,000</b> Euros per
              candidate.
            </li>
            <li>
              Option 2: Sign a minimum <b>2-year contract </b> with TechWings Global
              LLC, where
            </li>
            <p>
              we handle salary payments and provide monthly billing based on the
              number of hires from our platform. Salary negotiation for the selected
              candidate will be conducted separately.
            </p>
          </ul>
          <li>
            <b>Review of Contract: </b>We have attached a copy of the contract
            outlining the terms and conditions for hiring services from TechWings
            Global LLC. Please review the contract carefully and indicate your
            acceptance of the terms by signing and returning a copy to us.
          </li>
          <li>
            <b>Payment Process:</b> If you have selected Option 1, the one-time
            hiring fee of 7,000 Euros per candidate is payable upon confirmation of
            the hiring decision. Payment instructions will be provided upon receipt
            of the signed contract.
          </li>
          <li>
            <b>Salary Negotiation (Option 2):</b> If you have chosen Option 2, our
            team will reach out to initiate salary negotiation discussions for the
            selected candidate. Once salary terms are finalized, we will proceed
            with the signing of the contract and commencement of the hiring process.
          </li>
          <li>
            <b>Access to Candidate Details:</b> Upon receipt of the signed contract
            and payment (if applicable), we will provide you with access to the
            selected candidate's profile and contact information.
          </li>
        </ol>
        <p>
          Please let us know if you have any questions or require further
          assistance. We are committed to ensuring a smooth and efficient hiring
          process for your organization.
        </p>
        <p>
          We look forward to your prompt response and the opportunity to assist you
          with your talent acquisition needs.
        </p>
        <p>Sincerely Yours,</p>
    
        Nwogu Izuchukwu <br />
        Global Talent Acquisition Specialist
    
        <address>
          <a href="mailto:support@techwingsglobal.com"
            >support@techwingsglobal.com</a
          >
        </address>
        <address>
          <a href="www.techwingsglobal.com">www.techwingsglobal.com</a>
        </address>
        <address>
          <a href="tel:+49 1784914306" class="a">+49 1784914306</a>
        </address>
        <address>
          312 W. 2nd St #2615 <br />
          Casper, WY 82601 <br />
          United States
        </address>
      </body>
    </html>
    `;

  await sendEmail({
    email: user.email,
    subject: "Techwings receipt",
    message: message,
  });

  res.status(200).json({
    success: "Success",
    response: "Request sent, keep check your email",
  });
};

// GET ALL USERS
export const allUser = asyncErrorHandler(async (req, res, next) => {
  const features = new ApiFeatures(User.find(), req.query)
    .countDocuments()
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;
  // Get the total count of records
  let totalCount = await features.totalCountPromise;

  if (users.length === 0) {
    // let err = new CustomError("No users found");
    return res.json({ error: "Error", response: "No user found" });
    // return next(err);
  }
  res.status(200).json({
    success: "Success",
    RecordsEstimate: totalCount,
    lenght: users.length,
    users,
  });
});

// USER LOGIN
export const logInUser = async (req, res, next) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({
        error: "Error",
        response: "Required fields can't be empty",
      });

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(404).json({
        error: "Error",
        response: "Invalid email/password",
      });
    } else {
      let token = userToken(user._id, user.email);

      return res.status(200).json({ success: "success", token, user });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Error", response: error.message });
  }
};

// UPDATE A USER
export const updateUser = asyncErrorHandler(async (req, res) => {
  if (!req.body.jobID) return res.send("JobID is required");

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  updatedUser.password = undefined;

  if (!updatedUser) {
    // let err = new CustomError("User not found", 404);
    // return next(err);
    return res.json({ error: "Error", response: "User not found" });
  } else {
    res.send(updatedUser);
  }
});

// DELETE A USER
export const deleteUser = asyncErrorHandler(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.send(deletedUser);
});

// GET A USER
export const currentUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    // const err = new CustomError("User with this ID not found", 404);
    // return next(err);
    return res.json({
      error: "Error",
      response: "User with this ID not found",
    });
  }

  return res.status(200).send(user);
});

// AGGREGATION
export const userStat = async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $match: { date: { $lte: new Date() } } },
      { $match: { position: { $eq: "BE" } } },
      {
        $group: {
          _id: "$position",
          position: { $avg: "$position" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          totalPrice: { $sum: "$price" },
          userCount: { $sum: 1 },
        },
      },
      { $sort: { avgRating: 1 } },
      // { $match: { position: { $eq: "BE" } } },
    ]);
    return res.status(200).send({ length: stats.length, stats });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export const userRole = async (req, res) => {
  try {
    const role = req.params.role;
    const users = await User.aggregate([
      { $unwind: "$role" },
      {
        $group: {
          _id: "$role",
          roleCount: { $sum: 1 },
          users: { $push: "$name" },
        },
      },
      { $addFields: { role: "$_id" } },

      { $project: { _id: 0 } },
      { $sort: { role: -1 } },
      { $limit: 6 },
      { $match: { role: "admin" } },
    ]);
    return res.status(200).send({ length: users.length, users });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
//
// AUTHENTICATION
export const protect = asyncErrorHandler(async (req, res, next) => {
  // Read tokken & check if it exist
  const testToken = req.headers.authorization;
  let token;
  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }
  if (!token) {
    return res.json({ error: "Error", response: "Provide a token" });
    // return next(new CustomError("Provide a token", 401));
  }
  // Validate token
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.MY_SECRET
  );

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.json({
      error: "Error",
      response: "User with this token does not exist",
    });
    // const error = new CustomError("User with this token does not exist", 401);
    // next(error);
  }

  // If the user changed password when the token was issued
  if (await user.isPasswordChanged(decodedToken.iat)) {
    // const error = new CustomError(
    //   "Password have been changed lately, please login again",
    //   401
    // );
    // return next(error);
    return res.json({
      error: "Error",
      response: "Password has been changed lately",
    });
  }
  // Allow access to route
  req.user = user;
  next();
});

// AUTHORIZATION
// export const restrict = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       const error = new CustomError("Your not authorize for this action", 403);
//       next(error);
//     }
//     next()
//   };
// };

// MULTI ROLE AUTHORIZATION
export const restrictMulti = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      // const error = new CustomError("Your not authorize for this action", 403);
      // next(error);
      return res.json({
        error: "Error",
        response: "Your not authorized to do this",
      });
    }
    next();
  };
};

// FORGOT PASSWORD
export const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  // GET USER BY EMAIL
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    // const error = new CustomError("User with the given email not found", 404);
    // next(error);
    return res.json({
      error: "Error",
      response: "User with the given email not found",
    });
  }

  // GENERATE A RANDOM RESET TOKEN
  const resetToken = user.createResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // SEND THE TOKEN BACK TO THE USER EMAIL
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/user/resetpassword/${resetToken}`;

  console.log(resetURL);

  const message = `We recieved a password reset request, use the link bellow to reset your password\n\n${resetURL}\n\nThis link will be valid for 10 minutes`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password request received",
      message: message,
    });

    res.status(200).json({
      status: "Success",
      message: "Password reset link sent to " + user.email,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save({ validateBeforeSave: false });

    const msg = "Error occured sending password reset email, please try again";
    return res.json({ error: "Error", response: msg });
    // return next(new CustomError(msg, 500));
  }
});

export const resetPassword = asyncErrorHandler(async (req, res, next) => {
  // CHECK IF USER EXIST WITH THE GIVEN TOKEN AND TOKEN NOT EXPIRED
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    // const error = new CustomError("Try again token has expired", 400);
    // next(error);
    return res.json({
      error: "Error",
      response: "Try again token has expired",
    });
  }

  // RESET USER PASSWORD
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();
  user.save();

  // LOGIN USER
  let loginToken = userToken(user._id, user.email);

  console.log(loginToken);
  console.log("Logged in");

  return res.status(201).json({ loginToken, user });
});
