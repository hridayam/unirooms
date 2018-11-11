import axios from 'axios';

import { URL, LOGIN_USER } from './types';
import { app, db } from '../../firebase-setup'; 

//const db = firebase.firestore(app);
const usersCollection = db.collection('users');

export const loginUser = (credentials, cb) => async dispatch => {
    tryLogin(credentials, dispatch, cb);
};

const tryLogin = async (credentials, dispatch, cb) => {
    let { email, password } = credentials;
    email = email.trim();
    password = password.trim();

    try {
        let user = await app.auth().signInWithEmailAndPassword(email, password);
        user = user.user;
        
        if (user.emailVerified) {
            getUserData(user.uid, dispatch);
        }
        
        //cb(user.emailVerified);
    } catch (err) {
        console.log(err);
    }
};

export const getUserData = async (uid, dispatch) => {
    try {
        const user = await usersCollection.doc(uid).get();
        dispatch({
            type: LOGIN_USER,
            payload: user.data()
        });
    } catch (err) {
        console.log(err);
    }
};

export const registerUser = (data, cb) => async dispatch => {
    const { email, password } = data;
    try {
        const res = await axios.post(`${URL}registerUser`, data);
        tryLogin({ email, password }, dispatch, cb);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};

export const verifyUser = async (code, cb) => {
    try {
        const user = app.auth().currentUser;
        const data = {
            code,
            email: user.email
        };
        console.log(data);
        await axios.post(`${URL}verifyUser`, data);
        cb(true);
    } catch (err) {
        console.log(err);
    }
};
