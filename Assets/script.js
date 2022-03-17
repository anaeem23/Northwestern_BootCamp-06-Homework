var submit = $(".btn");
var city = $("#citySearch");
var cityName = $(".cityName");
var temp = $(".temp");
var wind = $(".wind");
var humidity = $(".humidity");
var uv = $(".UV");
var data = [];
var listGroup = $(".list-group");
var storedPlaces = [];

var day1img = $("#day1img");
var day2img = $("#day2img");
var day3img = $("#day3img");
var day4img = $("#day4img");
var day5img = $("#day5img");

var day1text = $(".day1text");
var day2text = $(".day2text");
var day3text = $(".day3text");
var day4text = $(".day4text");
var day5text = $(".day5text");

var day1title = $(".day1title");
var day2title = $(".day2title");
var day3title = $(".day3title");
var day4title = $(".day4title");
var day5title = $(".day5title");

GetListStorage();

weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=50332c7d87d04bc3530b2e5889d6c590";
weatherURL2 = `https://api.openweathermap.org/data/2.5/forecast?q=chicago&units=imperial&appid=50332c7d87d04bc3530b2e5889d6c590`;
var apiKey = "50332c7d87d04bc3530b2e5889d6c590";
var weatherURL4 = "https://api.openweathermap.org/data/2.5/forecast?";
weatherURL5 = "https://api.openweathermap.org/data/2.5/onecall?";

function getWeather2() {
  var requestObj = {
    url: weatherURL4,
    data: { q: city.val(), units: "imperial", appid: `${apiKey}` },
  };

  $.ajax(requestObj).done(function (response) {
    console.log(response);
    data = response;
    getWeather3(data);
  });
}

function getWeather3() {
  console.log(data);
  var requestObj = {
    url: weatherURL5,
    data: {
      lat: data.city.coord.lat,
      lon: data.city.coord.lon,
      units: "imperial",
      appid: `${apiKey}`,
    },
  };

  $.ajax(requestObj).done(function (response) {
    console.log(response);
    data1 = response;
    addInfo(data, data1);
  });
}

submit.on("click", function (event) {
  event.preventDefault();
  console.log(city.val());
  cityLocal = city.val();
  getWeather2();
  console.log(cityLocal);

  addList();

  document.querySelector("form").reset();
});

function addInfo() {
  // Save to storage

  // Add Current Info
  cityName.text(`${data.city.name} ${data.list[0].dt_txt}`);
  temp.text(`Temp: ${data.list[0].main.temp} F`);
  wind.text(`Wind: ${data.list[0].wind.speed} mph`);
  humidity.text(`Humidity: ${data.list[0].main.humidity} %`);
  uv.text(`UV: ${data1.current.uvi}`);

  if (data1.current.uvi <= 2) {
    uv.css("background-color", "green");
  } else if (2 < data1.current.uvi <= 5) {
    uv.css("background-color", "yellow");
  } else {
    uv.css("background-color", "red");
  }

  // Add 5-day Forcast

  if (document.querySelectorAll(".card-img-top-1").length > 0) {
    for (i = 1; i < 6; i++) {
      $(`.card-img-top-${i}`).remove();
    }
  }

  console.log(document.querySelectorAll(".card-img-top-1").length);
  for (i = 0; i < data.list.length; i++) {
    if (data.list[i].dt === data.list[0].dt) {
      day1text.text(`
      Temp: ${data.list[i].main.temp} F
      Wind: ${data.list[i].wind.speed} mph
      Humidity: ${data.list[i].main.humidity} %`);

      day1img.prepend(
        `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class = "card-img-top-1"/>`
      );

      day1title.text(data.list[i].dt_txt);
    } else if (data.list[i].dt === data.list[0].dt + 86400 * 1) {
      day2text.text(`
        Temp: ${data.list[i].main.temp} F
        Wind: ${data.list[i].wind.speed} mph
        Humidity: ${data.list[i].main.humidity} %`);

      day2img.prepend(
        `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class = "card-img-top-2"/>`
      );

      day2title.text(data.list[i].dt_txt);
    } else if (data.list[i].dt === data.list[0].dt + 86400 * 2) {
      day3text.text(`
        Temp: ${data.list[i].main.temp} F
        Wind: ${data.list[i].wind.speed} mph
        Humidity: ${data.list[i].main.humidity} %`);

      day3img.prepend(
        `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class = "card-img-top-3"/>`
      );

      day3title.text(data.list[i].dt_txt);
    } else if (data.list[i].dt === data.list[0].dt + 86400 * 3) {
      day4text.text(`
        Temp: ${data.list[i].main.temp} F
        Wind: ${data.list[i].wind.speed} mph
        Humidity: ${data.list[i].main.humidity} %`);

      day4img.prepend(
        `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class = "card-img-top-4"/>`
      );

      day4title.text(data.list[i].dt_txt);
    } else if (data.list[i].dt === data.list[0].dt + 86400 * 4) {
      day5text.text(`
      Temp: ${data.list[i].main.temp} F
      Wind: ${data.list[i].wind.speed} mph
      Humidity: ${data.list[i].main.humidity} %`);

      day5img.prepend(
        `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class = "card-img-top-5"/>`
      );

      day5title.text(data.list[i].dt_txt);
    }
  }
}

function addList() {
  storedPlaces.push(`${city.val()}`);

  console.log(storedPlaces);

  localStorage.setItem(`Places`, storedPlaces);

  var list = $('<li class = "list-group-item">');
  list.text(city.val());

  listGroup.append(list);
}

$(".list-group").on("click", function (event) {
  console.log(document.querySelectorAll(".active").length > 0);

  if (document.querySelectorAll(".active").length > 0) {
    $(".active").toggleClass("active");
  }

  $(event.target).toggleClass("active");

  city.val($(event.target).text());
  getWeather2();
});

function GetListStorage() {
  if (localStorage.getItem("Places") != null) {
    storedPlaces = localStorage.getItem("Places").split(",");
    console.log(storedPlaces);
    for (i = 0; i < storedPlaces.length; i++) {
      var list = $('<li class = "list-group-item">');
      list.text(storedPlaces[i]);
      listGroup.append(list);
    }
  }
}
