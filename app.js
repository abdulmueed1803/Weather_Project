const https = require('https');
const express = require('express');

const app = express();
let apiKey = '39ba93fe584cfdcef03dfa2b1d09967b' ;
let city = 'london';
const url = `https://api.openweathermap.org/data/2.5/weather?q=pune&units=metric&appid=${apiKey}`;

app.get("/",function(req,res){

    https.get(url,function(response){
        console.log("status code: " + response.statusCode)
       
    })

    res.sendFile(__dirname+"/index.html");
});

app.listen(3000, function(){
    console.log("listening on port 3000");
})