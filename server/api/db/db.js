import mongoose from "mongoose";

export default async function connect() {
  // mongoose.connect(process.env.DB_URI_ONLINE, {
  mongoose.connect(process.env.DB_URI_ONLINE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("DB Connected!");
  });
  connection.on("error", (err) => {
    console.error("Connection failed!", err.message);
  });
}
