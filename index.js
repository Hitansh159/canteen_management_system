const path = require("path");
const mysql = require('mysql');
const express = require("express");
const bodyParser = require("body-parser");
const db_connect = require("./db_connect");

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());

function setup_get_requests(link, filename){
  app.get(link, (req, res)=>{
    res.sendFile(path.join(__dirname, filename));
  });
}

var login_list = { 
  "/" : "sign_in.html",
  "/signup" : "sign_up.html"                
};

for(i in login_list ){
  setup_get_requests(i, login_list[i]);
} 

app.post("/", (req, res) => {
  const { user, pass, email, mob, uid, sut, fac } = req.body;
  var person = sut == true ? "s" : "f";
  if (send_data(user, pass, email, mob, person, uid)) {
    res.send({
      result: 1
    });
  }
  else
    res.send({
      result: 0
    });


});

// client views

var client_pages = {
  "/clientview" : "client_view.html",
  "/profile" : "profile.html",
  "/history" : "history.html",
  "/order" : "order.html",
  "/shedule" : "shedule.html" ,
  "/confirm" : "confirm.html"
};

for( i in client_pages){
  setup_get_requests(i, client_pages[i]);
}

app.post("/clientview", (req, res) => {
  const { id, pass } = req.body;

  var result = get_data(id
    , (result) => {
      console.log(result);

      if (result.length == 0)
        res.send({
          result: 0
        });

      else if (pass == result[0].password && result[0].type == 's')
        res.send({
          result: 1
        });

      else if (pass == result[0].password && result[0].type == 'f')
        res.send({
          result: 2
        });

      else if (pass == result[0].password && result[0].type == 'a')
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


// admin views

var admin_pages = {
  "/adminview" : "adminView.html",
  "/items_edit" : "item_edit.html",
  "/edit" : "item.html"
};

for(url in admin_pages){
  console.log
  setup_get_requests(url, admin_pages[url]);
}

app.post("/items_edit", (req, res) => {
  console.log("getting call");
  const { id, title, name, type, price } = req.body;

  res.send({
    result : update_food(id, title, name, type, price) ? 1 : 0
  });
    
});

app.post("/edit", (req, res) => {
  console.log("calling item.html");
  const {fid, name, type, price } = req.body ; 
  res.app.locals.fid = 0;
  res.send({result: 1})
  // res.set({fid:0});
  // res.render(path.join(__dirname, "item.html"));
});

app.get("/get_food_data", (req, res)=>{
  load_food((result)=>{
    console.log(result);
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});

/*
create a file name db_connect
store all functions their and change calling in this file from 
function_name to  db_connect.function_name 
*/
/*function connect() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aadi"
  });
}

function send_data(name, password, email, mobile, person, uid) {

  var conn = connect();
  var suc = true;
  conn.connect(function (err) {

      if (err){
        console.log(err);
        suc = false;
      }

      // console.log(name, password, email, mobile, person, uid);
      var sql = `INSERT INTO \`data\`(\`username\`, \`password\`, \`uid\`, \`mobile\`, \`email\`, \`type\`) VALUES  ('${name}','${password}','${uid}',${mobile},'${email}','${person}')`;

      conn.query(sql, function (err, result) {
        if (err){
          console.log(err);
          suc = false;
        }

        console.log("1 record inserted");
      });

    });

  return suc;
}

function get_data(id, callback) {

  var conn = connect();
  var suc = true;
  var res = null;

  conn.connect(function (err) {
    if (err){
      console.log(err)
      suc = false;
    }
    var sql = `SELECT * FROM \`data\` WHERE uid='${id}';`;
    // console.log(sql);

    conn.query(sql, function (err, result, field) {
      if (err){
        console.log(err);
        suc = false;
      }

      res = result;
      callback(result);
    });

  });
  return suc;
}

function update_food(id, title, name, type, price) {
  var conn = connect();
  var suc = true;

  conn.connect(function (err) {
  

    if (err) {
      console.log(err)
      suc = false;
      return false;
    }
    

    var sql = `UPDATE food SET name = '${name}', type = '${type}', price = ${price} WHERE fid = '${id}';`;

    conn.query(sql, function (err, result) {
      
      if (err) {
        console.log(err);
        suc = false;
        return false;
      }
  
      console.log("1 record updated");
    });
  });
  
  return suc;
}

function add_food(name, type, price){
  
  const conn = connect();
  var suc = true;

  conn.connect(function(err) {
    if(err) {
      console.log(err);
      suc = false;
    }

    var sql = `INSERT INTO food(name, type, price ) VALUES (${name}, ${type}, ${price});`;

    conn.query(sql, (err, result)=>{
      if(err){
        console.log(err);
        suc = false;
      }

      console.log("updated!");
    });
  });
  return suc;

}

function load_food(callback){
  const conn = connect();
  var suc = true;
  var res = null;

  conn.connect(function (err) {
    if (err){
      console.log(err)
      suc = false;
    }
    var sql = `SELECT * FROM food ;`;

    conn.query(sql, function (err, result, field) {
      if (err){
        console.log(err);
        suc = false;
      }

      res = result;
      callback(result);
    });

  });

  return suc;
}*/
