import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { setAuthentication } from '../../redux/auth/actions';
import store from '../../redux/store';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_APP_ID
}
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const tokenListener = () => {
    firebase.auth().onIdTokenChanged(async (user) => {
        if (user) {
            const token = await user.getIdToken();
            const {
                claims: { role }
            } = await user.getIdTokenResult();
            const uid = user.uid;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('uid', uid);
            store.dispatch(setAuthentication({token, role}));
        }
    });
};

export default firebaseApp;