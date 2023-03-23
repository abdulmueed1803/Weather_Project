const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});


app.post("/weather",function(req,res){

  let city = req.body.city ;
  const apiKey = '39ba93fe584cfdcef03dfa2b1d09967b' ;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      let temp = weatherData.main.temp;
      let desc = weatherData.weather[0].description;
      let icon = weatherData.weather[0].icon;
      let imgUrl = 'https://openweathermap.org/img/wn/'+icon +'@2x.png'

      res.write('<h1>The temperature in '+ city+ ' is ' +temp+ '</h1>');
      res.write('<p>The description is ' + desc + '</p>')
      res.write("<img src ="+imgUrl+">");
      res.send();
    });
  });
  
});


app.listen(3000,function(){
  console.log("Listening on 3000");
});