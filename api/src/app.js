const express = require('express')
var app = express()
var session = require('express-session');
require('dotenv').config({ path: '../.env' });

// Import our User schema
const User = require("../data_access/models")["user"];
const Sequelize = require("sequelize");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const withAuth = require('./auth');
const path = require("path");
const cookieParser = require('cookie-parser');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

// secret for token signing
const secret = process.env.SECRET;
app.use(cookieParser());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}));

app.use(session({
  secret: process.env.SECRET,
  // create new redis store.
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl :  260}),
  saveUninitialized: false,
  resave: false
}));




/* *************
**** ROUTES ****
***************/

// check that a given JWtoken is valid (for client auth)
app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.get("/", function(req, res) {
  res.render("index", { title: "Home" });
});

app.post("/checkin", async function(req, res) {
  if(!req.session.key) {
    res.status(403).send();  
  }
  else {
    // Accept location coordinates from client and enter new data into db
    // TODO
    console.log("INSIDE CHECKIN")
    console.log(req.body);
    res.status(201).send();
  }
  
})

app.get("/user", async function(req, res) {
  // make sure user is logged in, check the redis cache
  if(!req.session.key) {
    res.status(403).send();  
  }
  else {
    const firstName = req.session.key["first_name"];
    const lastName = req.session.key["last_name"];
    const sin = req.session.key["sin"];
    res.status(200).json({"first_name": firstName, "last_name": lastName, "sin": sin});
  }
  
});

// POST route to register a user
app.post('/register', function(req, res) {
  const { username, password, first_name, last_name, sin } = req.body;
  User.create({ 
      first_name: first_name, 
      last_name: last_name,
      username: username, 
      password: password,
      sin: sin
    }).then(function(user){
        // store session data
        req.session.key = {
          first_name: user.first_name,
          last_name: user.last_name,
          sin: user.sin,
          username: user.username
        };
        res.status(201).send();
      }).catch(function (err) {
        if (err instanceof Sequelize.UniqueConstraintError) {
            res.status(500).send(err.errors[0].message);
          }
        else{
            console.log(err);
            res.status(500)
            .send("Error registering new user please try again.");
        }
        
      });
});


app.post('/login', async function(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne(
    { where: { username: username },
    attributes: ['first_name', 'last_name', 'sin', 'username','password'] 
  }).catch(function(err) {
    console.log(err);
  });
  if (!user) {
    res.status(401)
      .json({
        error: 'User does not exist, please register.'
      });
  }
  else {
    user.comparePassword(password, function(err, same) {
      if (err) {
        console.log(err);
        res.status(500)
          .json({
            error: 'Internal error please try again'
        });
      } else if (!same) {
        res.status(401)
          .json({
            error: 'Incorrect username or password'
        });
      } else {
        // store session data
        req.session.key = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          sin: user.sin,
          username: user.username
        };
        res.status(200).send();
      }
    });
  }
});

app.get('/logout', function(req,res) {
  if(req.session.key) {
    req.session.destroy(function() {
      res.status(200).send();
    })
  }
  else res.status(500).send();
})

module.exports = app;