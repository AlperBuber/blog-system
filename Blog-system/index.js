const express = require("express");
const app = express();
const mysql = require("mysql2");
const db = require("./data/db");
const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blog")
const path = require('path');
const bodyParser = require('body-parser');

const publicDirectory = path.join(__dirname, './public');

app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.set("view engine", "ejs");
app.use(express.static(publicDirectory));
app.use(express.static('node_modules')); 




app.use('/auth', require('./routes/auth'));  
app.use(blogRoutes);
app.use(userRoutes);





app.listen(3000, () => {
    console.log("Listening on port 3000");
});


