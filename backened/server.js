const express = require("express");
const app = express();
require("./database");
require("./cron");

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/invest", require("./routes/investment"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/admin", require("./routes/admin"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
