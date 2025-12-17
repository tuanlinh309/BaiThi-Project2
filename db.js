const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DB_PATH = path.join(__dirname, 'data.db');

const db = new sqlite3.Database(DB_PATH);

function init(){
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  });
}

function createItem(title, cb){
  const stmt = db.prepare('INSERT INTO items (title) VALUES (?)');
  stmt.run(title, function(err){ cb(err, this ? this.lastID : null); });
  stmt.finalize();
}

function allItems(cb){
  db.all('SELECT id, title, created_at FROM items ORDER BY id DESC', cb);
}

function deleteItem(id, cb){
  db.run('DELETE FROM items WHERE id = ?', id, function(err){ cb(err); });
}

module.exports = { init, createItem, allItems, deleteItem };
