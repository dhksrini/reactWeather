import axios from 'axios';
import {FETCH_QUERY, FETCH_WEATHER, GET_CITIES} from '../types'

const APP_ID = `1efd01b0d6c1f8fad891803115288a28`;
export const searchCities = (query) => {
    return{
        type: FETCH_QUERY,
        payload: query
    }
}

export const fetchWeather = (city) => {
    const base_url = `http://api.openweathermap.org/data/2.5/forecast?appid=${APP_ID}`;
    const fetchweather = axios.get(`${base_url}&q=${city},IN`);
    return {
        type: FETCH_WEATHER,
        payload: fetchweather
    }
}

export const getCities = (url) => {
    const cities =  axios.get(url);
    return{
        type: GET_CITIES,
        payload: cities
    }
}