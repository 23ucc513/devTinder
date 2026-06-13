const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require('validator');


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send({
      message: `${loggedInUser.firstName}, your profile updated Successfull`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try{
    const { password } = req.body;
    if(!password) throw new Error("Password is required");

    if(!validator.isStrongPassword(password)){
      throw new Error("Password is not strong enough")
    }
    const loggedInUser = req.user;

    const hashedPassword = await bcrypt.hash(password, 10);
    loggedInUser.password = hashedPassword;
    await loggedInUser.save();

    res.send({
      message: "Password Updated Successfully",
      data: loggedInUser,
    });

  } catch (err) {
    res.status(400).send("ERROR: "+err.message);
  }
})

module.exports = profileRouter;
