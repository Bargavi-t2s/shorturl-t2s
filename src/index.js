const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const device = require('express-device');
const { PORT, SECRET_KEY } = require('./config/constants');
const { initRoutes } = require('./routes/routes');
const db = require('./database/db');
//const port = process.env.PORT
const userRouter = require('./routes/user')
var expressValidator = require('express-validator');

const app = express();
app.use(expressValidator());
app.use(session(
    {
        secret:'secret-code',
        resave: true,
        saveUninitialized: true
    }
    ));

app.use((req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', '*'); //Don't think we need CORS here.
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.set('views', path.join(__dirname, 'views')) // Redirect to the views directory inside the src directory
app.use(express.static(path.join(__dirname, '../public'))); // load local css and js files
app.set('view engine', 'ejs'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //Parse the cookie data (User ID).
app.use(device.capture());



app.use(express.json())
//app.use(userRouter)
initRoutes(app);
const port = 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));

//initRoutes(app);
//app.listen(port, () => console.log(`Server listening on port ${port}`));

export default app;

