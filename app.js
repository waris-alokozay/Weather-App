const { response } = require("express");
const express = require("express");
const { init } = require("express/lib/application");
const { readdirSync } = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
let port = 3000;

app.use(express.static("public"));

app.get("/Home", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/result", (req, res) => {
  let city = req.body.cityName;
  let apiKey = "ae46634f17a58a14f4038de45770eac2";
  let unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=35&lon=139&appid=${apiKey}&units=${unit}`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const weatherDis = weatherData.weather[0].description;
      let temp = weatherData.main.temp;
      temp = Math.floor(temp);
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // res.write(`<h1>The tempreture is: <strong>${temp}</strong>
      // in ${city} The description is: <strong>${weatherDis}</strong></h1>`);

      // res.write(`<img src="${imgUrl}" alt="img">`);
      res.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="./css/style.css" />

    <title>Weather app</title>
  </head>
  <body>
    <div id="container">
      <nav class="navbar navbar-expand-lg navbar-light nav-bg">
        <a class="navbar-brand nav-brand-text" href="#">Weather App</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#"
                >Home <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="header">
        <h1 class="text-center">Weather Forecast Worldwide.</h1>
      </div>
      <div class="main">
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img class="imgUrl" src="${imgUrl}" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="city card-title">${city}</h5>
              <p class="temp card-text"><strong>${temp} Celsius</strong></p>

              <p class="weatherDis">${weatherDis}</p>
            </div>
         </div>
      </div>
    </div>
       
      </div>
      <footer class="text-center"><p>2022 Made By Waris</p></footer>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script
      src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
      integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`);
      res.end();
    });
  });
});

app.listen(process.env.PORT || port, () => {
  console.log(`runnning in server port ${port}`);
});

{
  /* <div class="weather-card">
  <div class="card"></div>
</div>; */
}

// <div class="weather-card">
//   <div class="card">
//     <p class="city"> ${city} </p>
//     <p class="temp"><strong>${temp}℃</strong></p>
//     <img class="imgUrl" src="${imgUrl}" alt="img">
//     <span class="weatherDis">${weatherDis}</span>
//   </div>
// </div>
