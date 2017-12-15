import {FETCH_WEATHER} from '../types';
const init_state = {
    loading: false,
    fetchWeatherList: []
}
export default function(state = [], action){
    switch (action.type) {
        case FETCH_WEATHER:
            return [action.payload.data, ...state]
    }
    return state;
}