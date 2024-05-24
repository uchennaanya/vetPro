import multer from "multer";
import fs from "fs";
import path from "path";

function createFileUploader(dirName, maxFileSize, fileFilterLogic) {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      
      const dir = path.resolve("/", dirName);

      const cleanedDir = dir.replace(/^.*?[\\\/]/, "");


      if (!fs.existsSync(cleanedDir)) {
        try {
          fs.mkdirSync(cleanedDir, { recursive: true }); // Create directory recursively
        } catch (err) {
          console.error("Error creating directory:", err);
          
          return callback(err);
        }
      }
      console.log(cleanedDir);
      callback(null, cleanedDir);
    },
    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname);
      const filename = `${file.fieldname}-${Date.now()}${extension}`;
      callback(null, filename);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: fileFilterLogic, // Apply the file filter logic here
  });

  return upload;
}

// Define the file filter logic function
export function fileFilterLogic(req, file, cb) {
  // Check file type
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error("File type not supported"));
  }
}

// Example usage:
const cv = "CVs/";
const logo = "logo/";
const profileImg = "profileImg/";

const maxSize = 1024 * 1024 * 60; // 60MB

// Create the upload middleware with the provided parameters and file filter logic
export const uploadCv = createFileUploader(cv, maxSize, fileFilterLogic);
export const uploadLogo = createFileUploader(logo, maxSize, fileFilterLogic);
export const uploadProfileImg = createFileUploader(
  profileImg,
  maxSize,
  fileFilterLogic
);
