import { getAuthenticationError,
    getAuthenticationPending,
    getAuthenticationSuccess
} from "../auth/actions";


const url = import.meta.env.VITE_REACT_APP_API_URL;

// auth

export const getAuthAdmin = () => {
    const token = sessionStorage.getItem('token');
    return (dispatch) => {
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
