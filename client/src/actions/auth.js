import firebase from 'firebase';

export const loginUser = (credentials) => async dispatch => {
    const { email, password } = credentials;
    try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(user);
    } catch (err) {
        console.log(err);
    }
};
