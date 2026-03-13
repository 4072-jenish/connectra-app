require('dotenv').config();
const express = require('express');
const indexRouter = require('./src/Router/indexRouter');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 5000;
const passport = require('./src/Middleware/passport')
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/' , indexRouter);

app.listen(PORT , () => console.log(`server is running on http://localhost:${PORT}`));