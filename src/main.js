const API = "https://weatherapi-com.p.rapidapi.com/current.json?q=";
// const city = prompt();
const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", e => {
    e.preventDefault();
    let city = input.value;
    cityStats(city);
});

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'dd80657d25msh1f34806a82d65b2p123252jsn05f09e70a5c6',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}
async function cityStats(city){
    try {
        const stats = await fetchData(`${API}${city}`);
        let view = `
        <div class="data-container_top">
                <div class="data-city">
                    <h2>${stats.location.name}</h2>
                    <p>${stats.location.region}</p>  
                    <p>${stats.location.country}</p>
                </div>
                <p id="time">${stats.location.localtime}</p>
            </div>
            <div class="main-data">
                <p>${stats.current.temp_c}°</p>
                <img id="icon" src="${stats.current.condition.icon}" alt="Condicion">
            </div>
            <div class="data-bottom">
                <p>Nubosidad: ${stats.current.cloud}%</p>
                <p>Precipitación: ${stats.current.precip_mm}%</p>
            </div>
        `; 
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
};

var options2 = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  
  function success(pos) {
    var crd = pos.coords;
  
    let coords_city = [crd.latitude, crd.longitude]; 
    cityStats(coords_city);

  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
  
  navigator.geolocation.getCurrentPosition(success, error, options2);