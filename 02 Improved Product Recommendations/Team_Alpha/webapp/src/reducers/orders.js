import _ from 'lodash';
import { FETCH_ORDERS, LOGOUT_USER } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_ORDERS:
            return _.mapKeys(action.payload, '_id');

        case LOGOUT_USER:
            return {};

        default:
            return state;
    }
}