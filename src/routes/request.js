const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // Who is sending the connection Request
  
  console.log("Sending a connection request");
  res.send(user.firstName + " Sent Connection Request ");
});

module.exports = requestRouter;