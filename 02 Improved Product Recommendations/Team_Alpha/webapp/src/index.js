import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { LOGIN_USER } from './actions'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';
import Shop from './components/Shop';
import Buy from './components/Buy';
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if(token) {
    store.dispatch({ type: LOGIN_USER });
}

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <div className="super_container">
            <NavBar/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/shop' component={Shop}/>
                <Route exact path='/product/:id' component={Product}/>
                <Route exact path='/product/:id/buy' component={Buy}/>
                <Route exact path='/orders' component={Orders}/>
                <Route exact path='/orders/:id' component={OrderDetails}/>
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
