import { LOGIN_USER, LOGOUT_USER, AUTH_ERROR } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER:
            return { authenticated: true };

        case LOGOUT_USER:
            return { authenticated: false };

        case AUTH_ERROR:
            return { ...state, error: true, errorText: action.payload };

        default:
            return state;
    }
}