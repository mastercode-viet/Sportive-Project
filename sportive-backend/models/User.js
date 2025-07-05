const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    isAdmin: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    fullName: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true } // adds createdAt, updatedAt
);

module.exports = mongoose.model("User", userSchema);
