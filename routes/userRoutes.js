const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const { upi, paytmNumber, campaignName } = req.body;

    // Check if the number or UPI already exists for the same campaign
    const existingUser = await User.findOne({
      campaignName,
      $or: [
        { paytmNumber },
        { upi: upi || null } // Check upi if provided
      ],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Already submitted" });

    }

    const newUser = new User({ upi, paytmNumber, campaignName });
    await newUser.save();

    return res.status(200).json({ message: "Details submitted successfully." });
  } catch (error) {
    console.error("Submission error:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
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
