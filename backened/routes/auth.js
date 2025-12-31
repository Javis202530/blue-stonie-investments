const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (name, email, password, balance, profit)
    VALUES (?, ?, ?, 0, 0)
  `;

  db.run(sql, [name, email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ message: "User already exists" });
    }

    res.status(201).json({
      message: "Account created successfully",
      userId: this.lastID
    });
  });
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (err || !user)
        return res.status(400).json({ message: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ message: "Invalid credentials" });

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          balance: user.balance,
          profit: user.profit
        }
      });
    }
  );
});

module.exports = router;
