const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  upi: { type: String,},
  paytmNumber: { type: String, required: true },
  campaignName: { type: String, required: true }, // Store which campaign user participated in
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
