const DEFAULT_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = '?fields=name,capital,population,flags,languages';

export default function fetchCountries(name) {
    return fetch(`${DEFAULT_URL}${name}${searchParams}`)
    .then(response => response.json());
}