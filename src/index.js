import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import models from './models'
import {
    createUser, create
} from './controllers/user';

const app = express();

app.use(bodyParser.json());
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 


let port = process.env.PORT || 8080;

// set the view engine to ejs
// app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/html'));
app.use(express.static('./html'));


// const corsOptions = {
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
app.use(cors());

// force: true will drop the table if it already exits
// models.sequelize.sync({ force: true }).then(() => {
models.sequelize.sync().then(() => {
  console.log('Drop and Resync with {force: false}');
});

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

//default route
app.get('/', (req, res) => res.send('Hello my World'));

require('./routes/user.js')(app);
/*
app.post('/register', function (req, res, next) {
    const { firstname, password } = req.body;
    console.log(req.body);
    createUser({ firstname, password }).then(Users =>
        res.json({ Users, msg: 'account created successfully' })
    );
}); */

app.post('/register', function (req, res, next) {
    const { firstname, password } = req.body;
    create(req,res);
});

//create a server
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
