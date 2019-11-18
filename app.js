var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const flash = require('connect-flash')
const multer = require('multer');
const bodyParser = require("body-parser");
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const htmlcontroller = require('./apicontrollers/htmlcontroller')
require('dotenv').config()

//Router
const routesUser = require('./routes/users')
const routesAdmin = require('./routes/admin')
const routesProduct = require('./routes/product')
const UserModel = require('./models/user')


var app = express()
var port = process.env.port ||3000

//Connect DB 
  //Update ez
  /*
mongoose.connect(
  'mongodb+srv://admin:admin@web-nodejs-zrtjg.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
)*/

const MONGODB_URI =
'mongodb+srv://admin:admin@web-nodejs-zrtjg.mongodb.net/test?retryWrites=true&w=majority';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true}
)

//App use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

//- Dùng session để duy trì đăng nhập và để sử dụng flash
app.use(
  session({
  secret: 'tingodlike',
  resave: false, // session sẽ ko lưu với mỗi lệnh request => tốc đô
  saveUninitialized: false, // chắn chăn ko có session đc save mỗi request
  store: store
  }))
  
app.use('/images', express.static(path.join(__dirname, 'images')));

//- Dùng để đưa thông tin message 
app.use(flash())


app.use((req, res, next) => {  
  // gui ve 1 bien trong moi 1 route
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.Manager = req.session.isManager;
  res.locals.currentUser = req.session.user;
  
  next();
});


//Routes
htmlcontroller(app);
app.use(routesUser);
app.use(routesAdmin);
app.use(routesProduct);

// view engine setup
app.set('view engine', 'ejs');
app.set('views','views');


//-404 Error
app.use(function(req,res,next){
  const err = new Error('123 123 Not found!');
  err.status =404;
  next(err)
});







app.listen(port,function(){
  console.log('Server already')
})
module.exports = app;
