const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "sign_in.html"));
});

app.get("/signup", (req, res)=>{
  res.sendFile(path.join(__dirname, "sign_up.html"));
});

app.get("/clientview", (req, res)=>{
  res.sendFile(path.join(__dirname, "client_view.html"));
});

app.get("/profile", (req, res)=>{
  res.sendFile(path.join(__dirname, "profile.html"));
});

app.get("/history", (req, res)=>{
  res.sendFile(path.join(__dirname, "history.html"));
});

app.get("/order", (req, res)=>{
  res.sendFile(path.join(__dirname, "order.html"));
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});