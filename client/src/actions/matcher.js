import { RIGHT_SWIPE, LEFT_SWIPE, MATCHES, GET_MATCHER_USERS } from './types';
import { app, db, firebase } from '../../firebase-setup';

const matchesRef = db.collection('matches');
const usersRef = db.collection('users');

// if sending data is done, then start matching
// after matching, remove from the adding

const data = [];

const getUID = () => {
    return app.auth().currentUser.uid;
};

export const addLike = (otherId, cb) => async dispatch => {
    try {
        await usersRef.doc(getUID()).update({
            liked: firebase.firestore.FieldValue.arrayUnion(otherId)
        });
        dispatch({
            type: RIGHT_SWIPE,
            payload: otherId
        });
        cb();
    } catch (err) {
        console.log(err);
    }
};

export const addDisLike = (otherId, cb) => async dispatch => {
    console.log(otherId);
    try {
        usersRef.doc(getUID()).update({
            disliked: firebase.firestore.FieldValue.arrayUnion(otherId)
        });
        dispatch({
            type: LEFT_SWIPE,
            payload: otherId
        });
        cb();
    } catch (err) {
        console.log(err);
        cb(err);
    }
};

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
};

export const getUsers = () => async dispatch => {
    console.log('getting users');
            try {
            const allUsers = await usersRef.get();
            const currUser = await usersRef.doc(getUID()).get();
            const currData = currUser.data();
            const data = [];
            allUsers.forEach(u => {
                if(currData.liked.includes(u.id) || currData.disliked.includes(u.id))
                {
                    //do nothing
                }
                else if(currData.id === getUID())
                {
                    // do nothing
                }
                else {
                    data.push({
                        ...u.data(),
                        id: u.id
                    });
                    dispatch({
                        type: GET_MATCHER_USERS,
                        payload: data
                    })
                }
            });

        }
        catch (err) {
            console.log(err);
        }
};

// export const getUsers = () => async dispatch => {
//     console.log('getting users');
//     try {
//         const refs = await usersRef.get();
//         const data = [];
//         refs.forEach(ref => {
//             data.push({
//                 ...ref.data(),
//                 id: ref.id
//             });
//         });
//         dispatch({
//             type: GET_MATCHER_USERS,
//             payload: data
//         })
//     } catch (err) {
//         console.log(err);
//     }
// };
