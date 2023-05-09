import { getAuthenticationError,
    getAuthenticationPending,
    getAuthenticationSuccess
} from "../auth/actions";
import {
    getCategoriesPending,
    getCategoriesSuccess,
    getCategoriesError,
    getSingleCategoryPending,
    getSingleCategorySuccess,
    getSingleCategoryError,
    addCategoryPendiNg,
    addCategorySuccess,
    addCategoryError,
    editCategoryPending,
    editCategorySuccess,
    editCategoryError,
    deleteCategoryPending,
    deleteCategorySuccess,
    deleteCategoryError
} from '../categories/actions';

import {
    getProductsPending,
    getProductsSuccess,
    getProductsError,
    getSingleProductPending,
    getSingleProductSuccess,
    getSingleProductError,
    addProductPending,
    addProductSuccess,
    addProductError,
    editProductPending,
    editProductSuccess,
    editProductError,
    deleteProductPending,
    deleteProductSuccess,
    deleteProductError
} from '../products/actions';

const url = import.meta.env.VITE_REACT_APP_API_URL;

// auth

export const getAuthAdmin = () => {
    const token = sessionStorage.getItem('token');
    return async (dispatch) => {
        dispatch(getAuthenticationPending());
        return fetch(`${url}/admins/auth`, { headers: { token }})
            .then((response) => response.json())
            .then((response) =>{
                dispatch(getAuthenticationSuccess(response.data));
                return response.data;
            })
            .catch((error) => {
                dispatch(getAuthenticationError(error));
            })
    }
}

//get categories

export const getCategories = () => {
    return async (dispatch) => {
        dispatch(getCategoriesPending());
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`${url}/admin/categories`, { headers: { token } });
            const data = await response.json();

            return !data.error
                ? dispatch(getCategoriesSuccess(data.data))
                : dispatch(getCategoriesError(data.message));
        } catch (error) {
            return dispatch(getCategoriesError(error));
        }
    };
};

//get category by id
export const getSingleCategory = (id) => {
    return async (dispatch) => {
        dispatch(getSingleCategoryPending());

        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`${url}/admin/categories/${id}`, { header: { token } });
            const data = await response.json();

            return !data.error
                ? dispatch(getSingleCategorySuccess(data))
                : dispatch(getSingleCategoryError(data.message));
        } catch (error) {
            return dispatch(getAuthenticationError(error));
        }
    };
};

// create category
export const createCategory = (obj) => {
    return async (dispatch) => {
        dispatch(addCategoryPendiNg());
        try{
            const token = sessionStorage.getItem('token');
            const dataOption = {
                method: 'POST',
                headers: { 'Content-type':'application/json', token},
                body: JSON.stringify(obj)
            };

            const response = await fetch(`${url}/admin/categories`, dataOption);
            const data = response.json();

            return !data.error
                ? dispatch(addCategorySuccess(data))
                : dispatch(addCategoryError(data.message));

        } catch (error) {
            dispatch(addCategoryError(error));
        }
    };
};

// edit category
export const editCategory = (obj, id) => {
    return async  (dispatch) => {
        dispatch(editCategoryPending());

        try {
            const token = sessionStorage.getItem('token');
            const dataOption = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json', token},
                body: JSON.stringify(obj)
            };

            const response = await fetch(`${url}/admin/categories/${id}`, dataOption);
            const data = response.json();

            return !data.error
                ? dispatch(editCategorySuccess(data))
                : dispatch(editCategoryError(data.message));
        } catch (error) {
            dispatch(editCategoryError(error));
        }
    };
};

//delete category

export const deleteCategory = (id) => {
    return async (dispatch) => {
        dispatch(deleteCategoryPending());

        try {
            const token = sessionStorage.getItem('token');
            const dataOption = {
                method: 'DELETE',
                headers: { 'Content-type':'application/json', token}
            };


            const response = await fetch(`${url}/admin/categories/${id}`, dataOption);
            const data = await response.json();

            return !data.error
                ? dispatch(deleteCategorySuccess(id))
                : dispatch(deleteCategoryError(data.message));
        } catch (error) {
            dispatch(deleteCategoryError(error));
        }
    };
};

//get products

export const getProducts = () => {
    return async (dispatch) => {
        dispatch(getProductsPending());
        try{
            const response = await fetch(`${url}/general/`);
            const data = await response.json();

            return !data.error
                ? dispatch(getProductsSuccess(data.data))
                : dispatch(getProductsError(data.message));
        } catch (error) {
            return dispatch(getProductsError(error))
        }
    };
};

// get product by id 

export const getSingleProduct = (id) => {
    return async (dispatch) => {
        dispatch(getSingleProductPending())

        try {
            const response  = await fetch(`${url}/general/${id}`);
            const data = await response.json();

            return !data.error
                ? dispatch(getSingleProductSuccess(data.data))
                : dispatch(getSingleProductError(data.message));
        } catch (error) {
            return dispatch(getSingleProduct(error));
        }
    };
};

// add product

export const createProduct = (obj) => {
    return async (dispatch) => {
        dispatch(addProductPending);
        try {
            const token = sessionStorage.getItem('token');
            const requestConfig = {
                method: 'POST',
                headers: {'Content-type': 'application/json', token },
                body: JSON.stringify(obj)
            }

            const response = await fetch(`${url}/admin/products/`, requestConfig );
            const data = response.json();

            return !data.error
                ? dispatch(addProductSuccess(data))
                : dispatch(addProductError(data.message));
        } catch (error) {
            return dispatch(addProductError(error));
        }
    };
};

// edit Product 
export const editProduct = (obj, id) => {
    return async (dispatch) => {
        dispatch(editProductPending());

        try {
            const token = sessionStorage.getItem('token');
            const requestConfig = {
                method: 'PUT',
                headers : { 'Content-type': 'application/json', token },
                body: JSON.stringify(obj)
            }

            const response = await fetch(`${url}/admin/products/${id}`, requestConfig);
            const data = await response.json();

            return !data.error
                ? dispatch(editProductSuccess(data))
                : dispatch(editProductError(data.message));
        } catch (error) {
            return dispatch(editProductError(error));
        }
    };
};

// delete product 

export const deleteProduct = (id) => {
    return async (dispatch) => {
        dispatch(deleteProductPending());

        try{
            const token = sessionStorage.getItem('token');
            const requestConfig = {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json', token }
            }
            const response = await fetch(`${url}/admin/products/${id}`, requestConfig);
            const data = response.json();

            return !data.error
                ? dispatch(deleteProductSuccess(id))
                : dispatch(deleteProductError(data.message));
        } catch(error) {
            return dispatch(deleteProductError(error));
        }
    };
};