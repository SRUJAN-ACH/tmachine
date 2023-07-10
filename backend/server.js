const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

app.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO users (firstname, lastname, phonenumber, email, password) VALUES (?, ?, ?, ?, ?)";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.phonenumber,
    req.body.email,
    req.body.password,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql =
    "SELECT * FROM users WHERE email=? AND password=?";
  const values = [req.body.email, req.body.password];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("success");
    } else {
      return res.json("fail");
    }
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
