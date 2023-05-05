import {
    GET_CATEGORIES_PENDING,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    GET_SINGLE_CATEGORY_PENDING,
    GET_SINGLE_CATEGORY_SUCCESS,
    GET_SINGLE_CATEGORY_ERROR,
    ADD_CATEGORY_PENDING,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_ERROR,
    EDIT_CATEGORY_PENDING,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR,
    DELETE_CATEGORY_PENDING,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    RESET_MESSAGE
} from './constants';

export const getCategoriesPending = () => ({
    type: GET_CATEGORIES_PENDING
});

export const getCategoriesSuccess = (data) => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: data
});

export const getCategoriesError = (error) => ({
    type: GET_CATEGORIES_ERROR,
    payload: error
});

export const getSingleCategoryPending = () => ({
    type: GET_SINGLE_CATEGORY_PENDING
});

export const getSingleCategorySuccess = (data) => ({
    type: GET_SINGLE_CATEGORY_SUCCESS,
    payload: data
});

export const getSingleCategoryError = (error) => ({
    type: GET_SINGLE_CATEGORY_ERROR,
    payload: error,
});

export const addCategoryPendiNg = () => ({
    type: ADD_CATEGORY_PENDING
});

export const addCategorySuccess = (data) => ({
    type: ADD_CATEGORY_SUCCESS,
    payload: data
});

export const addCategoryError = (error) => ({
    type: ADD_CATEGORY_ERROR,
    payload: error
});

export const editCategoryPending = () => ({
    type: EDIT_CATEGORY_PENDING
});

export const editCategorySuccess = (data) => ({
    type: EDIT_CATEGORY_SUCCESS,
    payload: data
});

export const editCategoryError = (error) => ({
    type: EDIT_CATEGORY_ERROR,
    payload: error
});

export const deleteCategoryPending = () => ({
    type: DELETE_CATEGORY_PENDING
});

export const deleteCategorySuccess = (data) => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload: data
});

export const deleteCategoryError = (error) => ({
    type: DELETE_CATEGORY_ERROR,
    payload: error
});

export const resetMessage = () => {
    return {
      type: RESET_MESSAGE
    };
}