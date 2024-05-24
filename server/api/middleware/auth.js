import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "Authorization token required" });

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.MY_SECRET);

    req.user = await User.findOne({ _id }).select("_id");

    console.log(req.user )
    next();
  } catch (error) {
    console.log(error);
    res.json(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
