const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const { upi, paytmNumber, campaignName } = req.body;

    const newUser = new User({ upi, paytmNumber, campaignName });
    await newUser.save();

    res.json({ message: `✅ Data saved successfully for ${campaignName}!` });
  } catch (error) {
    res.status(500).json({ message: "❌ Error saving data", error });
  }
});

router.get("/campaign/:name", async (req, res) => {
    try {
      // Extract campaign name from URL
      const campaignName = req.params.name;
  
      // Find users who submitted details for this campaign
      const campaignUsers = await User.find({ campaignName });
  
      // Send response
      res.json(campaignUsers);
    } catch (error) {
      res.status(500).json({ message: "❌ Error retrieving data", error });
    }
  });
  

module.exports = router;
