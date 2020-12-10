const mysql = require('mysql');

function connect() {
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

    if (err) {
      console.log(err);
      suc = false;
    }

    // console.log(name, password, email, mobile, person, uid);
    var sql = `INSERT INTO \`data\`(\`username\`, \`password\`, \`uid\`, \`mobile\`, \`email\`, \`type\`) VALUES  ('${name}','${password}','${uid}',${mobile},'${email}','${person}')`;

    conn.query(sql, function (err, result) {
      if (err) {
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
    if (err) {
      console.log(err)
      suc = false;
    }
    var sql = `SELECT * FROM \`data\` WHERE uid='${id}';`;
    // console.log(sql);

    conn.query(sql, function (err, result, field) {
      if (err) {
        console.log(err);
        suc = false;
      }

      res = result;
      callback(result);
    });

  });
  return suc;
}

function update_food(id, name, type, price) {
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

function add_food(name, type, price) {

  const conn = connect();
  var suc = true;

  conn.connect(function (err) {
    if (err) {
      console.log(err);
      suc = false;
    }

    var sql = `INSERT INTO food(name, type, price ) VALUES (${name}, ${type}, ${price});`;

    conn.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        suc = false;
      }

      console.log("updated!");
    });
  });
  return suc;

}

function load_food(callback) {
  const conn = connect();
  var suc = true;
  var res = null;

  conn.connect(function (err) {
    if (err) {
      console.log(err)
      suc = false;
    }
    var sql = `SELECT * FROM food ;`;

    conn.query(sql, function (err, result, field) {
      if (err) {
        console.log(err);
        suc = false;
      }

      res = result;
      callback(result);
    });

  });

  return suc;
}

function set_order(order){ 
  for(var i=0;i< order["order"].length; i++){
    send_order_query(order["order"][i]);
  }
}

function send_order_query(order) {
  
  var suc = true;
  var conn = connect();
  if (order[2] == '0') return;
  console.log("testing", order[0], order[1]);
  

  conn.connect(function (err) {
    if (err) {
      console.log(err);
      suc = false;
    }

    var sql = `INSERT INTO bill(oid, fid, name, quantity, price) VALUES (9, ${order[0]}, '${order[1]}', ${order[2]}, ${order[3]})`;
    
    conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        suc = false;
      }
    });
    // conn.end();
  });
  return suc;
}

module.exports = { connect, send_data, get_data, update_food, add_food, load_food, set_order };