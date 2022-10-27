import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

let responseArray = [];

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');


inputEl.addEventListener('input', debounce(countryHandler, DEBOUNCE_DELAY));

function countryHandler(e) {
    let input = e.target.value.trim();

    if (input === '') {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        return;
    }

    fetchCountries(input)
    .then((array) => {
        responseArray = array;
        
        if (responseArray.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (responseArray.length > 1 && responseArray.length < 10) {
            countryInfoEl.innerHTML = '';

            countryListEl.innerHTML = markupList(responseArray);
        } else {
            countryListEl.innerHTML = '';

            countryInfoEl.innerHTML = markupInfo(responseArray);
        }
    })
    .catch((array => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    }))
}

function markupList(array) {
    return array.map(el => {
        return `
        <li><img src="${el['flags']['png']}" width = 100px></img>
        <span> - ${el['name']['official']}</span></li>`;
    }).join('');
}

function markupInfo(array) {
    return array.map(el => {
        return `
            <img src='${el['flags']['png']}' width = 200 heigth = 200/>
            <h2>${el['name']['official']}</h2>
            <p><span>Capital:</span> ${el['capital']}</p>
            <p><span>Population:</span> ${el['population']}</p>
            <p><span>Languages:</span> ${Object.values(el['languages']).join(', ')}</p>`
    }).join('');
}