const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db_connect = require("./db_connect");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());

function setup_get_requests(link, filename){
  app.get(link, (req, res)=>{
    res.render( "pages/"+filename);
  });
}

var login_list = { 
  "/" : "sign_in",
  "/signup" : "sign_up"                
};

for(i in login_list ){
  setup_get_requests(i, login_list[i]);
} 

app.post("/", (req, res) => {
  const { user, pass, email, mob, uid, sut, fac } = req.body;
  var person = sut == true ? "s" : "f";
  if (db_connect.send_data(user, pass, email, mob, person, uid)) {
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
  "/clientview" : "client_view",
  "/profile" : "profile",
  "/history" : "history",
  "/order" : "order",
  "/shedule" : "shedule" ,
  "/confirm" : "confirm"
};

for( i in client_pages){
  setup_get_requests(i, client_pages[i]);
}

app.post("/clientview", (req, res) => {
  const { id, pass } = req.body;

  var result = db_connect.get_data(id
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
  "/adminview" : "adminView",
  "/items_edit" : "item_edit",
  "/edit" : "item"
};

for(url in admin_pages){
  console.log
  setup_get_requests(url, admin_pages[url]);
}

app.post("/items_edit", (req, res) => {
  console.log("getting call");
  const { id, title, name, type, price } = req.body;

  res.send({
    result : db_connect.update_food(id, title, name, type, price) ? 1 : 0
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
  db_connect.load_food((result)=>{
    console.log(result);
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});

app.get("/view.js" ,(req,res)=>{
  res.sendFile(path.join(__dirname, "view.js"));
});

