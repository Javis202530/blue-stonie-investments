router.post("/withdraw", authMiddleware, (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  db.run(
    "INSERT INTO withdrawals (user_id, amount) VALUES (?, ?)",
    [req.user.id, amount],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Withdrawal request submitted" });
    }
  );
});
