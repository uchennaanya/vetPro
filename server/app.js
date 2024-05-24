import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import sanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import expressLimit from "express-rate-limit";

// import CustomError from "./api/utils/CustomError.js";
// import errCtrl from "./api/controllers/errorController.js";
import router from "./api/routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
let limiter = expressLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request made",
});

app.use(("/api", limiter));

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// const whitList = ["https://techwings.netlify.app/", "http://localhost:5173"];

// app.use(
//   cors({
//     origin: whitList,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   })
// );

app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
app.use(express.static(path.join(__dirname, "dist")));
app.use("/CVs", express.static(path.join(__dirname, "CVs")));
app.use("/logo", express.static(path.join(__dirname, "logo")));
app.use("/profileImg", express.static(path.join(__dirname, "profileImg")));

app.use(sanitize());
app.use(xss());
app.use(hpp({ whitelist: ["duration"] }));

app.use(router);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

// ACCESS-CONTROLLER
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/", (reg, res) =>
  res.send({ msg: "Thank you for considering TechWings." })
);

app.use(express.static(path.join(import.meta.url, "dist"))); // Serve static files from the "public" directory (React build files).

app.get("/*", (req, res) => {
  // res.sendFile(path.join(import.meta.url, "dist", "index.html"));
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.all("*", (req, res, next) => {
  // const err = new CustomError("In valid URL " + req.originalUrl, 404);
  // next(err);
  return res.json({
    error: "Error",
    response: "Invalid URL " + req.originalUrl,
  });
});

// app.use(errCtrl);

export default app;
