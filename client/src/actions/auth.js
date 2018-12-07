import axios from 'axios';

import { 
    URL, LOGIN_USER, LOGOUT_USER, UPDATE_USER, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, GET_MATCHES
} from './types';
import { app, db, firebase } from '../../firebase-setup'; 

//const db = firebase.firestore(app);
const usersCollection = db.collection('users');
const matchesRef = db.collection('matches');

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
       
        getUserData(user.uid, dispatch);
        
        cb();
    } catch (err) {
        console.log(err);
        cb(err);
    }
};

export const getUserData = async (uid, dispatch) => {
    try {
        const user = await usersCollection.doc(uid).get();
        dispatch({
            type: LOGIN_USER,
            payload: {
                id: uid,
                ...user.data()
            }
        });
    } catch (err) {
        console.log(err);
    }
};

export const reloadUser = (uid) => async dispatch => {
    getUserData(uid, dispatch);
};

export const registerUser = (data, cb) => async dispatch => {
    const { email, password } = data;
    try {
        const res = await axios.post(`${URL}registerUser`, data);
        tryLogin({ email, password }, dispatch, cb);
        console.log(res);
    } catch (err) {
        cb(err);
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

export const logoutUser = () => async dispatch => {
    app.auth().signOut();
    dispatch({
        type: LOGOUT_USER
    });
};

export const updateUserData = (data, cb) => async dispatch => {
    const { id } = data;
    const images = [];
    if (data.images.length !== 0) {
        try {
            data.images.forEach(async (image, i) => {
                const uri = await uploadImage(image, i, id, cb);
                images.push(uri);
                if (images.length === data.images.length) {
                    pushUpdatedUserData(data, id, images, cb, dispatch);
                }
            });
        } catch (err) {
            console.log(err);
            cb(err);
        }
    } else {
        pushUpdatedUserData(data, id, images, cb, dispatch);
    }
};

const pushUpdatedUserData = async (data, id, URIs, cb, dispatch) => {
    console.log(data);
    let images = URIs;
    try {
        const ref = await usersCollection.doc(id).get();
        images = images.concat(ref.data().images);
        images = images.slice(0, 6);
        const newData = {
            ...ref.data(),
            ...data.info,
            firstTimeUser: false,
            images
        };
        await usersCollection.doc(id).set(newData);
        dispatch({
            type: UPDATE_USER,
            payload: newData
        });
        cb();
    } catch (err) {
        console.log(err);
        cb(err);
    }
};

const uploadImage = async (image, i, id, cb) => {
    const base64Img = `data:image/jpg;base64,${image}`;
    const apiUrl = 'https://api.cloudinary.com/v1_1/dvt7vxvkz/image/upload';
    const data = {
        file: base64Img,
        upload_preset: 'unirooms-listings',
        folder: `users/${id}`,
    };

    try {
        let imageData = await fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        });
        imageData = await imageData.json();
        return imageData.secure_url;
    } catch (err) {
        cb(err);
        console.log(err);
    }
};

export const addToFavorites = (lid, cb) => async dispatch => {
    const userId = app.auth().currentUser.uid;
    try {
        await usersCollection.doc(userId).update({
            favorites: firebase.firestore.FieldValue.arrayUnion(lid)
        });
        dispatch({
            type: ADD_TO_FAVORITES,
            payload: lid
        });
        cb();
    } catch (err) {
        cb(err);
        console.log(err);
    }
};

export const removeFromFavorites = (lid, cb) => async dispatch => {
    const userId = app.auth().currentUser.uid;
    try {
        await usersCollection.doc(userId).update({
            favorites: firebase.firestore.FieldValue.arrayRemove(lid)
        });
        dispatch({
            type: REMOVE_FROM_FAVORITES,
            payload: lid
        });
        cb();
    } catch (err) {
        cb(err);
        console.log(err);
    }
};

export const getMatchedUsers = (cb) => async dispatch => {
    const uid = app.auth().currentUser.uid;
    const query = matchesRef.where('users', 'array-contains', uid);

    query.onSnapshot((docs) => {
        docs.docChanges().forEach(async change => {
            const temp = change.doc.data();
            
            let ouid;
            if (temp.users[0] === uid) {
                ouid = temp.users[1];
            } else {
                ouid = temp.users[0];
            }

            if (change.type === 'added') {
                try {
                    let user = await usersCollection.doc(ouid).get();
                    user = {
                        ...user.data(),
                        id: user.id
                    };
                    dispatch({
                        type: GET_MATCHES,
                        payload: user
                    });
                    cb();
                } catch (err) {
                    console.log(err);
                    cb(err);
                }
            }
        });
        cb();
    }, (err) => {
        console.log(err);
        cb(err);
    });
};
