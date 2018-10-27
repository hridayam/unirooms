import firebase from 'firebase';
import axios from 'axios';

import { URL } from './types'; 

export const loginUser = async (credentials) => {
    const { email, password } = credentials;
    try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(user);
    } catch (err) {
        console.log(err);
    }
};

export const registerUser = async data => {
    try {
        const res = await axios.post(`${URL}registerUser`, data);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};
