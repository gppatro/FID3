const express = require('express');
const mysql = require('mysql');


var app = express();

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fides3",
  database: "gppatro"
});

db.connect(function(err) {
  if(err) throw err;
});

function crd(data_list) {
  var data = "";
  var i;
  for(i=0; i<data_list.length; i++) {
    if(i != 0) {
      data = data + "SP,SP";
    }
    data = data + JSON.stringify(data_list[i]);
  }
  return data;
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/teste', function(req,res,next) {
  console.log("localhost:3000/teste");

  db.query("SELECT * FROM logMachines", function(err,result,fields) {
    if(err) throw err;

    var IP_list = "";
    var i;
    for(i=0; i<result.length; i++) {
      var temp = result[i];
      IP_list = IP_list + temp.IP;
      if(temp.MAX_AXIS == null ||
          temp.CNC_TYPE == null ||
          temp.MT_TYPE == null ||
          temp.SERIES == null ||
          temp.VERSION == null) {
        IP_list = IP_list + "N";
      }
      IP_list = IP_list + ",";
    }
    res.send(IP_list);

  });

});

app.get('/teste', function(req,res,next) {
  console.log("localhost:3000/teste");

  db.query("SELECT * FROM logDataProcess", function(err,result,fields) {
    if(err) throw err;

    var data = crd(result);
    res.send(data);

  });

});

app.get('/teste', function(req,res,next) {
  console.log("localhost:3000/teste");

  db.query("SELECT * FROM logMachines", function(err,result,fields) {
    if(err) throw err;

    var data = crd(result);
    res.send(data);

  });

});

app.listen(3000,()=>console.log("Listening to port 3000"));