const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const db = require("../database");

// GET all users (ADMIN ONLY)
router.get("/users", authMiddleware, isAdmin, (req, res) => {
  db.all("SELECT id, name, email, balance, role FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
