const path = require("path");
const mysql = require('mysql');
const express = require("express");
const bodyParser = require("body-parser");
const { send } = require("process");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "sign_in.html"));
});

app.post("/", (req, res)=>{
  const {user, pass, email, mob, uid, sut, fac} = req.body;
  var person = sut==true? "s" :"f";
  if ( send_data(user, pass, email, mob, person, uid)){
    res.send({
      result: 1
    });
  }
  else 
    res.send({
      result: 0
    });
  

});

app.get("/signup", (req, res)=>{
  res.sendFile(path.join(__dirname, "sign_up.html"));
});

// client views

app.get("/clientview", (req, res)=>{
  res.sendFile(path.join(__dirname, "client_view.html"));
});

app.post("/clientview", (req, res)=>{
  const {id, pass} = req.body;
  
  var result = get_data(id
    ,(result)=>{
      console.log(result); 

        if(result.length == 0) 
          res.send({
            result: 0
          });

        else if(pass == result[0].password && result[0].type == 's')
          res.send({
            result: 1
          });

        else if(pass == result[0].password && result[0].type == 'f')
          res.send({
            result: 2
          });
        
        else if(pass == result[0].password && result[0].type == 'a')
          res.send({
            result: 3
          });
        
        else
          res.send({
            result: 0
          });
        
        console.log(id, pass);
      }
  );
  
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

// admin views

app.get("/adminview", (req, res)=>{
  res.sendFile(path.join(__dirname, "adminView.html"));
});

app.get("/items_edit", (req, res)=>{
  res.sendFile(path.join(__dirname, "item_edit.html"))
});

app.get("/edit", (req, res)=>{
  res.sendFile(path.join(__dirname, "item.html"));
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});


function send_data(name, password, email, mobile, person, uid ){

  var con_data = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aadi"
  });

  var suc = true;
  con_data.connect(function(err) {
    if (err) 
      return err;
    
    // console.log(name, password, email, mobile, person, uid);
    var sql = `INSERT INTO \`data\`(\`username\`, \`password\`, \`uid\`, \`mobile\`, \`email\`, \`type\`) VALUES  ('${name}','${password}','${uid}',${mobile},'${email}','${person}')`;
    
    con_data.query(sql, function (err, result) {
      if (err)
        return err;

      console.log("1 record inserted");
    });
  });
  return suc;
}

function get_data(id, callback){

  var con_data = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aadi"
  });

  var suc = true;
  var res = null;
  con_data.connect(function(err) {
    if (err) 
      return err;
    
    var sql = `SELECT * FROM \`data\` WHERE uid='${id}';`;
    // console.log(sql);
    con_data.query(sql, function (err, result, field) {
      if (err)
        return err;

      res = result;
      callback(result);
    });
  });
  return res;
}