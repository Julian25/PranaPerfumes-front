import { TOGGLE_MODAL,
    SET_ADMIN,
    INCREMENT_COUNT,
    DECREMENT_COUNT,
    ADD_TO_CART,
    REMOVE_FROM_CART
} from "./constants";

export const toggleModal = () => {
    return {
        type: TOGGLE_MODAL
    };
};

export const setAdmin = (path) => {
    return {
        type: SET_ADMIN,
        payload: path
    };
};

export const incrementCount = () => {
    return {
        type: INCREMENT_COUNT
    };
};

export const decrementCount = () => {
    return {
        type: DECREMENT_COUNT
    };
};

export const addToCart = (data) => {
    return {
        type: ADD_TO_CART,
        payload: data
    };
};

export	const removeFromCart = (id) => {
    return {
        type: REMOVE_FROM_CART,
        payload: id
    };
};