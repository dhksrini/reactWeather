import {FETCH_QUERY} from '../types';

export default function(state = '', action){
    switch (action.type) {
        case FETCH_QUERY:
            return action.payload
    }
    return state;
}