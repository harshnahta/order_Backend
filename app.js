"use strict";
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
// var config=require('./config/config');
var userRoutes = require('./routes/userRoute');
var path = require('path');
var db=require('./db/db');
var cors = require('cors')

app.use((req , res , next )=> {
    res.setHeader('Access-Control-Allow-Origin' ,'*');
    res.setHeader('Access-Control-Allow-Methods' ,'GET , POST , PUT , PATCH , DELETE,OPTIONS,OPTION');
    res.setHeader('Access-Control-Allow-Headers' ,'Access-Control-Max-Age,Accept-Encoding,Content-Type, X-Requested-With , Accept , Origin,authorization,tokens');
    res.setHeader('Access-Control-Expose-Headers' , 'authorization,tokens');
    next();
});


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



app.use("/products",express.static(__dirname+ '/images/products'));

app.use('/user', userRoutes);


const port = 9003;
app.listen(port,()=>{
    console.log(`Server started ${port}`);   
});

