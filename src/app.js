const express = require("express");
const connectDB = require("./config/database");
const app = express();

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Amiya",
    lastName: "Singh",
    emailId: "amiya@singh.com",
    password: "amiya@123",
  });
  // Creating a new instance of the User Model
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the Data");
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Established...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000....");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });
