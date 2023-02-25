const express = require("express")
const app = express()
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cookieSession = require('cookie-session');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'foodcyclerdb'
})

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
    name: 'session',
    keys: ['secretkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));

app.post("/api/createUser", (req, res) => {
    const sqlInsert = "INSERT INTO user_table (user_name,user_password) VALUES (?,?)";
  
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
  
    db.query(sqlInsert, [userName, userPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(409).send("User with the same user name already exists");
        } else {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      } else {
        res.status(201).send("User created successfully");
      }
    });
  });

  app.post("/api/login", (req, res) => {
    const sqlSelect =
      "SELECT * FROM user_table WHERE user_name = ? AND user_password = ?";
  
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
  
    db.query(sqlSelect, [userName, userPassword], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else if (result.length === 0) {
        res.status(401).send("Invalid user name or password");
      } else {
        res.status(200).send(true); 
      }
    });
  });

  app.get("/api/fridgeItems/:username", (req, res) => {
    const sqlSelect = "SELECT * FROM fridge_items WHERE user_name = ?";
    const username = req.params.username;
    db.query(sqlSelect, username, (err, result) => {
      if (err) {
        res.status(500).send({ error: "Error retrieving fridge items" });
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, ()=> {
    console.log("Success")
})