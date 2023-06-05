import {
    loginPending,
    loginSuccess,
    loginError
} from '../auth/actions';
import firebase from '../../helper/firebase';


export const login = (credentials) => {
    return async (dispatch) => {
        dispatch(loginPending());
        try {
            const response = await firebase
                .auth()
                .signInWithEmailAndPassword(credentials.email, credentials.password);
            const token = await response.user.getIdToken();
            const uid = response.user.uid;
            const {
                claims: { role }
            } = await response.user.getIdTokenResult();
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('uid', uid);
            return dispatch(loginSuccess());
        } catch (error) {
            return dispatch(loginError(error.toString()));
        }
    };
};