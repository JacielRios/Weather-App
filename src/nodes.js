const $ = (name) => document.querySelector(name);

//header
const header = $('header');
const form = $('.header__search--container');
const inputCity = $('#city');

// nodos de la card principal
const cardGeoData = $('.card__geo');
const cardTemperatureContainer = $('.card__info--temperature');
const cardImageContainer = $('.card__image--container');

// nodos de informacion extra
const infoExtraValuesContainer = $('.infoExtra__values')

//Buttons
const btnGetCoords = $('.coords');
const btnSearch = $('#search');