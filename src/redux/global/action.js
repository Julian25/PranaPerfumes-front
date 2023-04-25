import { TOGGLE_MODAL, SET_ADMIN } from "./constants";

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