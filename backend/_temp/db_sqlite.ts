import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/tgc.sqlite", (err) => {
  if (err) {
    console.error("Error connecting to DB");
  } else {
    console.log("DB connected");
  }
});

export default db;
