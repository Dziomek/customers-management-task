import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("customers.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to the database");
});

db.run(
  "CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, vat_number TEXT, address TEXT)"
);
