import { RIGHT_SWIPE, LEFT_SWIPE, MATCHES } from './types';
import { app, db, firebase } from '../../firebase-setup';

const matchesRef = db.collection('matches');
const likeRef = db.collection('likes');
const dislikeRef = db.collection('dislikes');
const usersRef = db.collection('users');

// if sending data is done, then start matching
// after matching, remove from the adding


const getUID = () => {
    return app.auth().currentUser.uid;
};

const addLike = (uid, temp, dispatch) => {

    likeRef.doc(data.id).update({
        thread: firebase.firestore.FieldValue.arrayUnion(data.content),
        users: data.users
    })
    .catch(err => console.log(err));
}

const addDisLike = (uid, temp, dispatch) => {

    dislikeRef.doc(data.id).update({
        thread: firebase.firestore.FieldValue.arrayUnion(data.content),
        users: data.users
    })
    .catch(err => console.log(err));
}
