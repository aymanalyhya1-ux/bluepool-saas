
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "bluepool_secret";

const user = {
  phone: "0538351229",
  password: "123456"
};

app.post("/api/auth/login", (req, res) => {
  const { phone, password } = req.body;

  if (phone !== user.phone || password !== user.password) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  const token = jwt.sign({ phone }, SECRET, { expiresIn: "7d" });

  res.json({ token });
});

app.get("/api/visits", (req, res) => {
  res.json([
    { id: 1, pool: "فيلا 12", status: "مكتملة" },
    { id: 2, pool: "فندق أكوا", status: "قيد الانتظار" }
  ]);
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working 🚀" });
});

app.listen(5000, () => console.log("Server running on 5000"));
