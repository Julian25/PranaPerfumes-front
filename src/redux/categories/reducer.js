
import { ADD_CATEGORY_ERROR,
    ADD_CATEGORY_PENDING,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    DELETE_CATEGORY_PENDING,
    DELETE_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR,
    EDIT_CATEGORY_PENDING,
    EDIT_CATEGORY_SUCCESS,
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_PENDING,
    GET_CATEGORIES_SUCCESS,
    GET_SINGLE_CATEGORY_ERROR,
    GET_SINGLE_CATEGORY_PENDING,
    GET_SINGLE_CATEGORY_SUCCESS,
    RESET_MESSAGE }
    from './constants';

const initialState = {
    list : [],
    isLoading: false,
    category: undefined,
    error: false,
    message: ''
};

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.payload
            };
        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                error: true,
                message: action.payload,
                isLoading: false
            };
        case GET_SINGLE_CATEGORY_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case GET_SINGLE_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                category: action.payload,
                message: action.payload.message
            };
        case GET_SINGLE_CATEGORY_ERROR:
            return {
                ...state,
                error: true,
                message: action.payload,
                isLoading: false
            };
        case ADD_CATEGORY_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload,
                isLoading: false,
                error: false,
                message: 'Categoria creada exitosamente'
            };
        case ADD_CATEGORY_ERROR:
            return {
                ...state,
                error: true,
                message: action.payload.message,
                isLoading: false
            };
        case EDIT_CATEGORY_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                category: action.payload,
                message: action.payload.message
            };
        case EDIT_CATEGORY_ERROR:
            return {
                ...state,
                error: true,
                message: action.payload,
                isLoading: false
            };
        case DELETE_CATEGORY_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                list : [...state.list.filter((category) => category._id !== action.payload)],
                message: 'Categoría eliminada exitosamente'
            };
        case DELETE_CATEGORY_ERROR:
            return {
                ...state,
                error: true,
                message: action.payload,
                isLoading: false
            };
        case RESET_MESSAGE:
            return {
              ...state,
              message: ''
            };
        default:
            return state;
    }
};