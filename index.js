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

app.post("/clientview", (req, res)=>{
  const {id, pass} = req.body;
  
  if(id != "hkd159@gmail.com"){
    res.send({
      result: 0
    });
  }

  else{
    res.send({
      result: 1
    });
  }
    console.log(id, pass);
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

app.get("/shedule", (req, res)=>{
  res.sendFile(path.join(__dirname, "shedule.html"));
});

app.get("/confirm", (req, res)=>{
  res.sendFile(path.join(__dirname, "confirm.html"));
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});