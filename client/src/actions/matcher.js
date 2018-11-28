import { RIGHT_SWIPE, LEFT_SWIPE, MATCHES, GET_MATCHER_USERS } from './types';
import { app, db, firebase } from '../../firebase-setup';

const matchesRef = db.collection('matches');
const usersRef = db.collection('users');

// if sending data is done, then start matching
// after matching, remove from the adding


const getUID = () => {
    return app.auth().currentUser.uid;
};

export const addLike = (otherId, cb) => {

    usersRef.doc(getUID()).update({
        liked: firebase.firestore.FieldValue.arrayUnion(otherId)
    })
    .then(() => {
        cb()
    })
    .catch(err => console.log(err));

}

export const addDisLike = (otherId) => {

    usersRef.doc(getUID()).update({
        disliked: firebase.firestore.FieldValue.arrayUnion(otherId)
    })
    .catch(err => console.log(err));
}

export const getLikes = (otherId) => async dispatch => {
    try {
        const likes =[];
        const ref = await usersRef.doc(otherId).get();
        const data = ref.data()
        console.log(data);
        const uId = getUID()
        console.log(data.liked);
        if(data.liked.includes(getUID()))
        {
            // match it
                matchesRef.add({
                users: [otherId, uId]
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

export const getUsers = () => async dispatch => {
    try {
        const refs = await usersRef.get();
        const data = [];
        refs.forEach(ref => {
            data.push({
                ...ref.data(),
                id: ref.id
            });
        });
        dispatch({
            type: GET_MATCHER_USERS,
            payload: data
        })
    } catch (err) {
        console.log(err);
    }
};
