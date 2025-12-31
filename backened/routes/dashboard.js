const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT 
      u.balance,
      IFNULL(SUM(i.amount), 0) AS total_invested,
      IFNULL(SUM(i.daily_profit), 0) AS daily_profit,
      COUNT(i.id) AS active_investments
    FROM users u
    LEFT JOIN investments i ON u.id = i.user_id
    WHERE u.id = ?
  `;

  db.get(sql, [userId], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });

    res.json({
      balance: row.balance || 0,
      totalInvested: row.total_invested || 0,
      dailyProfit: row.daily_profit || 0,
      activeInvestments: row.active_investments || 0
    });
  });
});

module.exports = router;
