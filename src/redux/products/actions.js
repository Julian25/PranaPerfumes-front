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
} from './constants';


export const getProductsPending = () => ({
    type: GET_PRODUCTS_PENDING
});

export const getProductsSuccess = (data) => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: data
});

export const getProductsError = (error) => ({
    type: GET_PRODUCTS_ERROR,
    payload: error
});

export const getSingleProductPending = () => ({
    type: GET_SINGLE_PRODUCT_PENDING
});

export const getSingleProductSuccess = (data) => ({
    type: GET_SINGLE_PRODUCT_SUCCESS,
    payload: data
});

export const getSingleProductError = (error) => ({
    type: GET_SINGLE_PRODUCT_ERROR,
    payload: error
});

export const addProductPending = () => ({
    type: ADD_PRODUCT_PENDING
});

export const addProductSuccess = (data) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: data
});

export const addProductError = (error) => ({
    type: ADD_PRODUCT_ERROR,
    payload: error
});

export const editProductPending = () => ({
    type: EDIT_PRODUCT_PENDING
});

export const editProductSuccess = (data) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: data
});

export const editProductError = (error) => ({
    type: EDIT_PRODUCT_ERROR,
    payload: error
});

export const deleteProductPending = () => ({
    type: DELETE_PRODUCT_PENDING
});

export const deleteProductSuccess = (data) => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload: data
});

export const deleteProductError = (error) => ({
    type: DELETE_PRODUCT_ERROR,
    payload: error
});