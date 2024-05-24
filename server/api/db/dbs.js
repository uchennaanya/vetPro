import mongoose from "mongoose";

export default async function connect() {
  if (process.env.NODE_ENV === "development") {
    mongoose.connect(process.env.DB_LOCAL_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } else {
    mongoose.connect(process.env.DB_URI_ONLINE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("DB Connected!");
  });
  connection.on("error", (err) => {
    console.error("Connection failed!", err.message);
  });
}

// PORT=8000

// DB_URI_ONLINE="mongodb+srv://martinsanya19:dbE4skaadnGI3MgJ@cluster0.n3ccnm0.mongodb.net/techWings?retryWrites=true&w=majority"

// DB_LOCAL_URI=mongodb://127.0.0.1:27017/techWings

// MY_SECRET=4102e087c18bb05ae47444110b8730c7932f6cbddcff64dcd0d8714c303f6a82d6eaf5bf3ca80dcaf05272f5b4c2b2145cbfbe1d140deb1a245ea82fab90bb43

// # ATLAS_PASS=dbE4skaadnGI3MgJ

// EMAIL_TEST=martinsanya19@gmail.com
// EMAIL_PASSWORD=vlyk bmrl ockg bowr

// # NODE_ENV=production
// # NODE_ENV=development

//     "production": "node server.js",
//     "start": "SET NODE_ENV=development& nodemon server.js",
//     "production": "SET NODE_ENV=development& node server.js"
