require('dotenv').config();
const express = require('express');
const indexRouter = require('./src/Router/indexRouter');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/' , indexRouter);

app.listen(PORT , () => console.log(`server is running on http://localhost:${PORT}`));