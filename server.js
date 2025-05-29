const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataFile = path.join(__dirname, 'admin_data.json');

// API - Get Data
app.get('/api/data', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Oxunma xətası' });
    res.json(JSON.parse(data));
  });
});

// API - Update Data
app.post('/api/data', (req, res) => {
  const newData = JSON.stringify(req.body, null, 2);
  fs.writeFile(dataFile, newData, (err) => {
    if (err) return res.status(500).json({ error: 'Yazılma xətası' });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server işə düşdü: http://localhost:${PORT}`);
});