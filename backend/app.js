const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

dotenv.config({ path: './config.env' });

require('./db/conn');
// const User = require('./models/userSchema')
app.use(express.json());

app.use(require('./router/auth'));
app.use(require('./router/productRoutes'));
app.use(require('./router/orderRoutes'));

const PORT = process.env.PORT;


app.listen(PORT,()=> {
    console.log(`server is running at port no ${PORT}`);
})