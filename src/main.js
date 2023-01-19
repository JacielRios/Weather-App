const baseUrl = "https://api.openweathermap.org/";
const key = "7a7b7c55a138b61d616600efbbb647d3";

btnSearch.addEventListener("click", () => {  
  const city = inputCity.value;
  createCard({ cityValue: city });
})

form.addEventListener("submit", (e) => {  
  e.preventDefault();
  const city = inputCity.value;
  createCard({ cityValue: city });
});

const getCoords = (e) => {
  const options = {
    maximumAge: Infinity,
  };

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    createCard({ lat: lat, lon: lon });
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  if (e.target.nodeName === "IMG") {
    
    cardGeoData.classList.add("skeleton");
    cardTemperatureContainer.classList.add("skeleton");
    cardImageContainer.classList.add("skeleton");
    infoExtraContainer.classList.add("skeleton");

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
};

const getDataByCity = async (city) => {
  const response = await fetch(
    `${baseUrl}data/2.5/weather?q=${city}&lang=es&appid=${key}&units=metric`
  );
  const data = await response.json();
  return data;
};

const getData = async (lat, lon) => {
  const response = await fetch(
    `${baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=${key}&units=metric`
  );
  const data = await response.json();
  return data;
};

const getGeoData = async (lat, lon) => {
  const response = await fetch(
    `${baseUrl}geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${key}`
  );
  const data = await response.json();
  return data;
};

const createExtraInfo = (data) => {
  infoExtraValuesContainer.innerHTML = "";

  const nubosityValue = document.createElement("p");
  const humidityValue = document.createElement("p");
  const pressureValue = document.createElement("p");
  const visibilityValue = document.createElement("p");
  const windSpeedValue = document.createElement("p");

  nubosityValue.textContent = `${data.clouds.all}%`;
  humidityValue.textContent = `${data.main.humidity}%`;
  pressureValue.textContent = `${data.main.pressure} hPa`;
  visibilityValue.textContent = `${data.visibility / 1000} km`;
  windSpeedValue.textContent = `${Math.round(data.wind.speed * 3.6)} k/h`;

  infoExtraValuesContainer.append(
    nubosityValue,
    humidityValue,
    pressureValue,
    visibilityValue,
    windSpeedValue
  );
};

const createCard = async ({ lat, lon, cityValue }) => {
  cardGeoData.innerHTML = "";
  cardTemperatureContainer.innerHTML = "";
  cardImageContainer.innerHTML = "";
  inputCity.value = ""
  
  cardGeoData.classList.remove("skeleton");
  cardTemperatureContainer.classList.remove("skeleton");
  cardImageContainer.classList.remove("skeleton");
  infoExtraContainer.classList.remove("skeleton");


  if (lat) {
    var data = await getData(lat, lon);
  } else if (cityValue) {
    var data = await getDataByCity(cityValue);
  }
  var geoData = await getGeoData(data.coord.lat, data.coord.lon);

  // nodos de cardGeoData
  const city = document.createElement("h1");
  const stateAndCountry = document.createElement("p");

  city.textContent = geoData[0].name;
  stateAndCountry.textContent = `${geoData[0].state}, ${geoData[0].country}`;

  cardGeoData.append(city, stateAndCountry);
  // nodos de cardTemperatureContainer
  const minAndMax = document.createElement("p");
  const temperature = document.createElement("strong");
  const feelLike = document.createElement("p");

  minAndMax.textContent = `Max ${Math.round(
    data.main.temp_max
  )}° / Min ${Math.round(data.main.temp_min)}°`;
  temperature.textContent = `${Math.round(data.main.temp)} °C`;
  feelLike.textContent = `Sensación de ${Math.round(data.main.feels_like)}°`;

  cardTemperatureContainer.append(minAndMax, temperature, feelLike);
  // nodos de cardImageContainer
  const currentWeatherImg = document.createElement("img");
  const currentWeatherText = document.createElement("p");

  currentWeatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currentWeatherImg.alt = data.weather[0].main;
  let string = data.weather[0].description;
  currentWeatherText.textContent =
    string.charAt(0).toUpperCase() + string.slice(1);

  cardImageContainer.append(currentWeatherImg, currentWeatherText);

  createExtraInfo(data);
};

btnGetCoords.addEventListener("click", function (e) {
  getCoords(e);
});

createCard({ cityValue: "new york city" });
