import { combineReducers } from 'redux';
import auth from './auth';
import items from './items';
import orders from './orders';

const rootReducer = combineReducers({
    auth,
    items,
    orders
});

export default rootReducer;