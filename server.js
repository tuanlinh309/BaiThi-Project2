const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend (index.html is in project root)
app.use(express.static(path.join(__dirname)));

db.init();

app.get('/api/items', (req, res) => {
  db.allItems((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/items', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  db.createItem(title, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id, title });
  });
});

app.delete('/api/items/:id', (req, res) => {
  const id = req.params.id;
  db.deleteItem(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end();
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
