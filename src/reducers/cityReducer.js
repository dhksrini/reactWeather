import {GET_CITIES} from '../types';
export default function(state = null, action){
    switch (action.type) {
        case GET_CITIES:
            return [action.payload.data]
    }
    return state;
}