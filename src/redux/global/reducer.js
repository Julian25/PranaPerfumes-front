import { createRoutesFromChildren, json } from "react-router-dom";
import { TOGGLE_MODAL,
        SET_ADMIN,
        INCREMENT_COUNT,
        DECREMENT_COUNT,
        ADD_TO_CART,
        REMOVE_FROM_CART
} from "./constants";

let savedJson = localStorage.getItem('cart');
let savedArray = JSON.parse(savedJson);
let savedCount = localStorage.getItem('count');
console.log(savedCount);
const initialState = {
    showModal: false,
    message: '',
    loading: false,
    adminPath: '/',
    count: savedCount > 0 ? savedCount : 0,
    cart : savedArray !== null ? savedArray : []
};

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state,
                showModal: !state.showModal
            };
        case SET_ADMIN:
            return {
                ...state,
                adminPath: action.payload
            };
        case INCREMENT_COUNT:
            let countToSave = state.count +1;
            countToSave > 0 && localStorage.setItem('count', countToSave);
            console.log(countToSave);
            return {
                ...state,
                count: state.count + 1
            };
        case DECREMENT_COUNT:
            let decrementedCount = state.count -1;
            decrementedCount >=0 && localStorage.setItem('count', decrementedCount)
            return {
                ...state,
                count: state.count -1
            };
        case ADD_TO_CART:
            const itemToAdd = action.payload;
            const existItem = state.cart.find((cartItem) => cartItem._id === itemToAdd._id)
            if(!existItem) {
                let savedCart = [...state.cart, {...itemToAdd, cartCount: 1}];
                let json = JSON.stringify(savedCart);
                localStorage.setItem('cart', json);
                return {
                    ...state,
                    cart: [...state.cart, {...itemToAdd, cartCount: 1}],
                };
            } else {
                let savedCart = state.cart.map((cartItem) =>
                    cartItem._id === existItem._id ?
                    {...cartItem, cartCount: cartItem.cartCount + 1} : cartItem)
                let json = JSON.stringify(savedCart);
                localStorage.setItem('cart', json);
                return {
                    ...state,
                    cart: state.cart.map((cartItem) =>
                        cartItem._id === existItem._id ?
                        {...cartItem, cartCount: cartItem.cartCount + 1} : cartItem)
                };
            };
        case REMOVE_FROM_CART:
            const productInCart =  state.cart.find((cartItem) => cartItem._id === action.payload);
            if(productInCart) {
                if(productInCart.cartCount > 1) {
                    let savedCart = state.cart.map((cartItem) =>
                    cartItem._id === action.payload ?
                    {...cartItem, cartCount: cartItem.cartCount - 1} : cartItem)
                    let json = JSON.stringify(savedCart);
                    localStorage.setItem('cart', json);
                    return {
                        ...state,
                        cart: state.cart.map((cartItem) =>
                            cartItem._id === action.payload ?
                            {...cartItem, cartCount: cartItem.cartCount - 1} : cartItem)
                    };
                } else {
                    let savedCart = [...state.cart.filter((cartItem) => cartItem._id !== action.payload)]
                    let json = JSON.stringify(savedCart);
                    localStorage.setItem('cart', json);
                    return {
                        ...state,
                        cart: [...state.cart.filter((cartItem) => cartItem._id !== action.payload)]
                    }
                }
            }
        default:
            return state;
    };
};