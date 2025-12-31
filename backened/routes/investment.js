const express = require("express");
const db = require("../database");
const router = express.Router();

// CREATE INVESTMENT
router.post("/create", (req, res) => {
  const { user_id, amount } = req.body;

  if (!user_id || !amount)
    return res.status(400).json({ message: "Missing data" });

  let daily_profit = 0;

  if (amount >= 15 && amount <= 100) daily_profit = amount * 0.025;
  else if (amount >= 101 && amount <= 500) daily_profit = amount * 0.03;
  else if (amount >= 501 && amount <= 1000) daily_profit = amount * 0.04;
  else return res.status(400).json({ message: "Invalid amount" });

  const sql = `
    INSERT INTO investments (user_id, amount, daily_profit, start_date, status)
    VALUES (?, ?, ?, DATE('now'), 'active')
  `;

  db.run(sql, [user_id, amount, daily_profit], function (err) {
    if (err) return res.status(500).json({ message: "DB error" });

    res.json({
      message: "Investment created",
      investment_id: this.lastID,
      daily_profit
    });
  });
});

module.exports = router;
