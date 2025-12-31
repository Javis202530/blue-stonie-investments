const cron = require("node-cron");
const db = require("./database");

// Runs every day at midnight (00:00)
cron.schedule("0 0 * * *", () => {
  console.log("Running daily profit job...");

  db.all("SELECT * FROM investments", [], (err, investments) => {
    if (err) {
      console.error("Error fetching investments:", err);
      return;
    }

    investments.forEach(inv => {
      const dailyProfit = inv.amount * inv.daily_profit;

      db.run(
        "UPDATE users SET balance = balance + ? WHERE id = ?",
        [dailyProfit, inv.user_id],
        err => {
          if (err) console.error("Error updating balance:", err);
        }
      );
    });
  });
});
