import Talent from "../models/talentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";

// import ApiFeatures from "./../utils/apiFeatures.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
// import CustomError from "../utils/CustomError.js";
import sendEmail from "../utils/email.js";
// import Job from "../models/jobsModel.js";
// import { response } from "express";

// import * as dotenv from "dotenv";
// dotenv.config();

export const createTalent = async (req, res) => {
  const { email, name, phone, password } = req.body;

  try {
    if (!email || !name || !phone)
      return res.json({ error: "Error", response: "Fill out all fields" });

    if (!req.file)
      return res.json({ error: "Error", response: "No file uploaded" });

    const img = req.file.path;
    let talentExist = await Talent.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!talentExist) {
      await Talent.create({ ...req.body, cvs: img, password: hashedPassword });

      const verifyLink = `${req.protocol}://${req.get(
        "host"
      )}/userslayout/confirm/${req.params.id}`;

      const message = `Use the link bellow, to verify your email \n\n${verifyLink}\n\nThis link will be valid for 10 minutes`;

      // console.log(talentExist.email);

      await sendEmail({
        email: email,
        subject: "Confirm your password",
        message: message,
      });
    } else {
      return res.json({
        error: "error",
        response: "Talent with email already exist",
      });
    }

    return res.json({
      success: "Success",
      response: "Confirm your email to proceed to next phase",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "Error",
      response: error.message,
    });
  }
};

export const confirmTalent = async (req, res) => {
  const user = await Talent.find({ _id: req.params.id });

  if (!user)
    return res
      .status(404)
      .json({ error: "Error", response: "Talent not found" });

  await Talent.findByIdAndUpdate(
    { _id: req.params.id },
    { status: "active" },
    { new: true, runValidators: true }
  );
  return res
    .status(200)
    .json({ success: "Success", response: "Activated login" });
};

export const downloadFile = async (req, res, next) => {
  try {
    const id = req.params.id;

    const item = await Talent.findById(id);

    if (!item) return res.status(404).json({ error: "Item not found" });

    const file = item.cvs;

    console.log(file);

    if (!file)
      return res.status(404).json({ error: "File not found for the item" });

    // const __dirname = path.dirname(file);

    // const filePath = new URL(`${__dirname}${file}`, import.meta.url).pathname;
    // server\CVs\cv-1714064150488.pdf

    const filePath = path.resolve("CVs", file);

    console.log(filePath);

    res.download(filePath);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .send({ error: false, response: "Missing required fields" });

  const talent = await Talent.findOne({ email });

  if (!talent)
    return res
      .status(400)
      .send({ error: "Error", response: "User not found!" });

  try {
    if (await bcrypt.compare(password, talent.password)) {
      const token = jwt.sign({ _id: talent._id }, process.env.MY_SECRET, {
        expiresIn: "1d",
      });
      res.send({
        success: true,
        talent,
        token,
      });
    } else {
      res.status(400).send({ error: false, response: "Invalid credentials!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: false, response: error.message });
  }
};

export const getTalents = async (req, res) => {
  try {
    let getTalents = await Talent.find({});

    if (getTalents === true)
      return res
        .status(404)
        .json({ error: "Error", response: "No applicant yet" });

    return res.json({
      success: "Success",
      response: getTalents,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      response: "Something went wrong",
    });
  }
};

export const getTalent = async (req, res) => {
  try {
    let getTalent = await Talent.findOne({ _id: req.params.id });
    return res.json({
      success: "Success",
      response: getTalent,
    });
  } catch (err) {
    console.log(err.name);
    res.status(500).send({
      error: err.message,
      response: "Somthing went wrong",
    });
  }
};

export const updateTalent = async (req, res) => {
  const { bio, status, location, designation } = req.body;
  try {
    if (!req.file)
      return res.json({ error: "Error", response: "No file uploaded" });

    const profileImg = req.file.path;
    await Talent.findByIdAndUpdate(
      req.params.id,
      { bio, location, designation, status, profileImg },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json({
      success: "Success!",
      response: "Updated succesfully",
    });
  } catch (err) {
    return res.json({
      error: "Error",
      response: "Failed to update",
    });
  }
};

export const deleteTalent = async (req, res) => {
  try {
    await Talent.findByIdAndDelete({ _id: req.params.id });
    return res.json({
      message: "Success",
      response: "Deleted successfully",
    });
  } catch (err) {
    console.log(err.name);
    return res.json({
      message: err.message,
      response: "Failed to delete",
    });
  }
};

// EMAIL VERIFICATION
export const verifyTalent = asyncErrorHandler(async (req, res, next) => {
  const updated = await Talent.findByIdAndUpdate(
    req.params.id,
    { status: "verified" },
    { new: true }
  );
  return res.status(201).json({ updated });
});
