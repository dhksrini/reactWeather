import { combineReducers } from 'redux';
import FetchWeather from './fetchWeather';
import SearchCities from './searchCities';
import GetCities from './cityReducer';

const rootReducer = combineReducers({
  weather: FetchWeather,
  searchCities: SearchCities,
  getCities: GetCities
});

export default rootReducer;
