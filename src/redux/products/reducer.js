import {
    GET_PRODUCTS_PENDING,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_PENDING,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
    ADD_PRODUCT_PENDING,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    EDIT_PRODUCT_PENDING,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR,
    DELETE_PRODUCT_PENDING,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR
} from './constants'


const initialState = {
    list: [],
    isLoading: false,
    product: undefined,
    error: false,
    message: ''
}
export const productsReducer = ( state = initialState, action) =>{
    switch(action.type) {
        case GET_PRODUCTS_PENDING:
            return {
                ...state,
                isLoading: true
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.payload
            };
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                error: true,
                message: action.payload,
            };
        case GET_SINGLE_PRODUCT_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                message: action.payload.message
            };
        case GET_SINGLE_PRODUCT_ERROR:
            return {
                ...state,
                message: action.payload.message,
                error: true
            };
        case ADD_PRODUCT_PENDING: 
            return {
                ...state,
                isLoading: true
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                project: action.payload,
                isLoading: false,
                error: false,
                message: action.payload.message
            };
        case ADD_PRODUCT_ERROR:
            return {
                ...state,
                message: action.payload,
                error: true
            };
        case EDIT_PRODUCT_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                message: action.payload.message
            };
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                error: true,
                message: action.payload.message
            };
        case DELETE_PRODUCT_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list : [...state.list.filter((product) =>  product._id !== action.payload)],
                message: action.payload.message
            };
        case DELETE_PRODUCT_ERROR:
            return {
                ...state,
                error: true,
                message: action.payload.message
            };
        default:
            return state;
    }
}