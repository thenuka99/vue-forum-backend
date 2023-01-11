// this will find and all the .env  file in root folder
require('dotenv').config();

//cors for handeling ports
const cors = require("cors");

//express
const express = require('express');
const app = express();

//connect to db
const connectDB = require('./config/db');
connectDB();

//middleware
app.use(express.json());
app.use(cors());

//routes
// app.use('/api/', require('./routes/'));

//set port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));