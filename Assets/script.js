var submit = $(".btn");
var city = $("#citySearch");
var cityName = $(".cityName");
var temp = $(".temp");
var wind = $(".wind");
var humidity = $(".humidity");
var uv = $(".UV");
var data = [];
var listGroup = $(".list-group")

var day1img = $(".day1img");
var day2img = $(".day2img");
var day3img = $(".day3img");
var day4img = $(".day4img");
var day5img = $(".day5img");

var day1text = $(".day1text");
var day2text = $(".day2text");
var day3text = $(".day3text");
var day4text = $(".day4text");
var day5text = $(".day5text");

weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=50332c7d87d04bc3530b2e5889d6c590";
weatherURL2 = `https://api.openweathermap.org/data/2.5/forecast?q=chicago&units=imperial&appid=50332c7d87d04bc3530b2e5889d6c590`;
var apiKey = "50332c7d87d04bc3530b2e5889d6c590";
var weatherURL4 = "https://api.openweathermap.org/data/2.5/forecast?";

function getWeather2() {
  var requestObj = {
    url: weatherURL4,
    data: { q: city.val(), units: "imperial", appid: `${apiKey}` },
  };

  $.ajax(requestObj).done(function (response) {
    console.log(response);
    data = response;
    addInfo(data);
  });
}

submit.on("click", function (event) {
  event.preventDefault();
  console.log(city.val());
  cityLocal = city.val();
  getWeather2();
  console.log(cityLocal);

  addList()

  document.querySelector('form').reset();
});

function addInfo() {

  // Add Current Info
  cityName.text(data.city.name);
  temp.text(`Temp: ${data.list[0].main.temp}`);
  wind.text(`Wind: ${data.list[0].wind.speed}`);
  humidity.text(`Humidity: ${data.list[0].main.humidity}`);


  // Add 5-day Forcast

  for (i = 0; i < data.list.length; i++) {

    
    if (data.list[i].dt === data.list[0].dt) {
      day1text.text(data.list[i].dt_txt);

    } else if (data.list[i].dt === data.list[0].dt + 86400*1) {
        day2text.text(data.list[i].dt_txt)

    } else if (data.list[i].dt === data.list[0].dt + 86400*2) {
        day3text.text(data.list[i].dt_txt)

    } else if (data.list[i].dt === data.list[0].dt + 86400*3) {
        day4text.text(data.list[i].dt_txt)

    } else if (data.list[i].dt === data.list[0].dt + 86400*4) {
        day5text.text(data.list[i].dt_txt)

    }
  }



  
}

function addList() {

  var list = $('<li class = "list-group-item">')
  list.text(city.val())

  listGroup.append(list)

}

$(".list-group").on("click", function(event) {


  console.log(document.querySelectorAll(".active").length>0)

  if (document.querySelectorAll(".active").length>0) {
    $(".active").toggleClass("active")
  }
  
  $(event.target).toggleClass("active")

  city.val($(event.target).text())
  getWeather2()
})

