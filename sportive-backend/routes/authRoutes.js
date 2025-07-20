const express = require("express");
const router = express.Router();
const { register, login, updateAccount, changePassword, getAllUsers } = require("../controllers/authController");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// Route to create admin account (should be removed in production)
router.post("/create-admin", async (req, res) => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(400).json({ error: "Admin account already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
      username: "admin",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "admin",
      isAdmin: true
    });

    await admin.save();
    res.status(201).json({ message: "Admin account created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy danh sách user (admin)
router.get("/users", authenticate, authorize("admin"), getAllUsers);

router.put("/update", authenticate, updateAccount);
router.put("/change-password", authenticate, changePassword);

// Xóa user theo id (admin)
router.delete("/delete/:id", authenticate, authorize("admin"), require("../controllers/authController").deleteUserById);

module.exports = router;
