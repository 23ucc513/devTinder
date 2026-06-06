const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User Model 
  // using the data which has been recieved through the POST API
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the Data");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try{
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
})

// Delete API
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
})

// Update data of the user
app.patch("/user", async (req, res) => {
  const data = req.body;
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId}, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
})


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
