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

// secret for token signing
const secret = process.env.SECRET;

app.use('*', cors_1.default());
app.use(compression_1.default());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

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
    attributes: ['first_name', 'last_name', 'sin', 'username', 'password'] }); //object }));
  console.log(user instanceof User);
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
      res.cookie('token', token, { httpOnly: true })
        .sendStatus(200);
    }
  });
});


module.exports = app;