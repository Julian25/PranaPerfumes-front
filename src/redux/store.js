import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './auth/reducer';
import { globalReducer } from './global/reducer';
import { categoriesReducer } from './categories/reducer';
import { productsReducer } from './products/reducer';


const rootReducer = combineReducers({
    auth: authReducer,
    global: globalReducer,
    categories: categoriesReducer,
    products: productsReducer
});

const configureStore = () => {
    const enhancer = composeWithDevTools(applyMiddleware(thunk));
    return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;