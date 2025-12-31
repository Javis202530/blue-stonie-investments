const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "database.db"), (err) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.log("Database connected");
  }
});

/* USERS TABLE */
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    balance REAL DEFAULT 0
  )
`);

/* INVESTMENTS TABLE */
db.run(`
  CREATE TABLE IF NOT EXISTS investments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount REAL,
    daily_profit REAL,
    duration INTEGER,
    end_date TEXT
  )
`);

/* WITHDRAWALS TABLE */
db.run(`
  CREATE TABLE IF NOT EXISTS withdrawals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount REAL,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
