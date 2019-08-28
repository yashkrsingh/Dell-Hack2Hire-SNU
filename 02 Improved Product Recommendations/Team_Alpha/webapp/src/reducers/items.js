import _ from 'lodash';
import { FETCH_ITEMS } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_ITEMS:
            // console.log(action.payload)
            // console.log(_.mapKeys(action.payload, '_id'));
            return { ...state, ...(_.mapKeys(action.payload, '_id'))};

        default:
            return state;
    }
}