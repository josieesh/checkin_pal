var express_1 = __importDefault(require("express"));
var app = express_1.default();
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var session = require('express-session');
require('dotenv').config({ path: '../.env' });

// Import our User schema
const User = require("../data_access/models")["user"];
const Sequelize = require("sequelize");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const withAuth = require('./auth');
const path = require("path");
const express = require("express");
const cookieParser = require('cookie-parser');

// secret for token signing
const secret = process.env.SECRET;

app.use('*', cors_1.default());
app.use(compression_1.default());
app.use(cookieParser());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// views folder and engine conf
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));




/* *************
**** ROUTES ****
***************/

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// check that a given token is valid
app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

app.get("/", function(req, res) {
  res.render("index", { title: "Home" });
});

app.get("/checkin", withAuth, function(req, res) {
  // Snapshot position request.
  res.render("checkin", {title: "Check-In"});
  console.log(coords);
})

app.get("/user", withAuth, async function(req, res) {
  // get the user's info
  const user = await User.findOne(
    { where: {username: req.username } }
  ).catch(function(err) {
    console.log(err);
  });
  if(!user) {
    // at this stage, the user should be authenticated and should exist, so if we dont find the user, something went horribly wrong
    res.status(500).json({ error: "Something went wrong!" });  
  }
  else {
    const firstName = user.first_name;
    const lastName = user.last_name;
    res.render("user", { title: "Profile", userProfile: { firstName: firstName, lastName: lastName } });
  }
  
});

// POST route to register a user
app.post('/register', function(req, res) {
  const { username, password, first_name, last_name, sin } = req.body;
  const user = User.create({ 
      first_name: first_name, 
      last_name: last_name,
      username: username, 
      password: password,
      sin: sin
    }).then(function(item){
        res.json({
          "New user" : {
              "First name": first_name,
              "Last name": last_name,
              "Username": username,
              "SIN": sin
          }
        });
      }).catch(function (err) {
        if (err instanceof Sequelize.UniqueConstraintError) {
            res.status(500).send(err.errors[0].message);
          }
        else{
            res.status(500)
            .send("Error registering new user please try again.");
        }
        
      });
});


app.post('/login', async function(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne(
    { where: { username: username },
    attributes: ['first_name', 'last_name', 'sin', 'username', 'password'] 
  }).catch(function(err) {
    console.log(err);
  });
  if (!user) {
    res.status(401)
      .json({
        error: 'Incorrect email or password'
      });
  }
  else {
    user.comparePassword(password, function(err, same) {
      if (err) {
        res.status(500)
          .json({
            error: 'Internal error please try again'
        });
      } else if (!same) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
        });
      } else {
        // Issue token
        const payload = { username };
        const token = jwt.sign(payload, secret, {
          expiresIn: '1h'
        });
        res.cookie('token', token, { httpOnly: true/*, secure: true*/ }); // need to comment this out while debugging
          //.sendStatus(200);
        res.redirect(302, '/user');
      }
    });
  }
});


module.exports = app;