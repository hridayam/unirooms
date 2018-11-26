import { RIGHT_SWIPE, LEFT_SWIPE, MATCHES } from './types';
import { app, db, firebase } from '../../firebase-setup';

const matchesRef = db.collection('matches');
const usersRef = db.collection('users');

// if sending data is done, then start matching
// after matching, remove from the adding


const getUID = () => {
    return app.auth().currentUser.uid;
};

const addLike = (id, uid) => {

    usersRef.doc(getUID()).update({
        likes: firebase.firestore.FieldValue.arrayUnion(data.content)
    })
    .catch(err => console.log(err));
}

const addDisLike = (id, uid) => {

    usersRef.doc(getUID()).update({
        dislikes: firebase.firestore.FieldValue.arrayUnion(data.content)
    })
    .catch(err => console.log(err));
}
