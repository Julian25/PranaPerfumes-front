import { TOGGLE_MODAL, SET_ADMIN  } from "./constants";


const initialState = {
    showModal: false,
    message: '',
    loading: false,
    adminPath: '/'
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
        default:
            return state;
    };
};