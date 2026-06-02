const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '..', '..', 'datos.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS profiles (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    isVerified BOOLEAN DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS places (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    address    TEXT NOT NULL,
    isVerified BOOLEAN DEFAULT 0,
    capacity   INTEGER NOT NULL,
    owner      INTEGER NOT NULL,
    FOREIGN KEY (owner) REFERENCES profiles(id)
  );
`);

module.exports = db;