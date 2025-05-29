const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 2002;

app.use(cors());
app.use(express.json());

app.get("/api/data", (req, res) => {
  const data = fs.readFileSync("admin_data.json", "utf8");
  res.json(JSON.parse(data));
});

app.post("/api/save", (req, res) => {
  fs.writeFileSync("admin_data.json", JSON.stringify(req.body, null, 2));
  res.json({ message: "Uğurla yadda saxlanıldı." });
});

app.listen(PORT, () => {
  console.log(`Server işləyir: ${PORT}`);
});