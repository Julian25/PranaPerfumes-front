import {
    addToCart,
    removeFromCart
} from '../global/action';

const url = import.meta.env.VITE_REACT_APP_API_URL;

export const addProductToCart = (id) => {
    return async (dispatch) => {

        try {
            const response  = await fetch(`${url}/general/${id}`);
            const data = await response.json();

            return !data.error && dispatch(addToCart(data.data))
        } catch (error) {
            console.log(error);
        }
    };
};