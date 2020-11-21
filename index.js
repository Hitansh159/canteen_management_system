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

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});