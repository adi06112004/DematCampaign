const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  upi: { type: String, },
  paytmNumber: { type: String, required: true },
  campaignName: { type: String, required: true }, // Store which campaign user participated in
  createdAt: { type: Date, default: Date.now },
});

UserSchema.index({ paytmNumber: 1, campaignName: 1 }, { unique: true });
UserSchema.index({ upi: 1, campaignName: 1 }, { unique: true, sparse: true });


module.exports = mongoose.model("User", UserSchema);
