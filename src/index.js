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

            countryListEl.innerHTML = responseArray.map(country => {
                return `
                <li><img src="${country['flags']['png']}" width = 100px></img>
                <span> - ${country['name']['official']}</span></li>`;
            }).join('');
        } else {
            countryListEl.innerHTML = '';

            countryInfoEl.innerHTML = responseArray.map(country => {
                return `
                    <img src='${country['flags']['png']}' width = 200 heigth = 200/>
                    <h2>${country['name']['official']}</h2>
                    <p><span>Capital:</span> ${country['capital']}</p>
                    <p><span>Population:</span> ${country['population']}</p>
                    <p><span>Languages:</span> ${Object.values(country['languages']).join(', ')}</p>`
            }).join('');
        }
    })
    .catch((array => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    }))
}