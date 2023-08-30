//entry point
//installing express

const express = require("express");
// express() return a obj.
const app = express();
//to connect to db.
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
// to destucture the json coming from client side.
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
const path = require("path");
//whenever a api request in  coming with '/api/user' go and search userRoute var.
//use is request handler.
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);


if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
//created port at 5000 because 3000 is busy in frontend
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));

// to list to port.
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
