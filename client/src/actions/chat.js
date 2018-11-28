import { GET_MESSAGES, UPDATE_MESSAGES } from './types';
import { app, db, firebase } from '../../firebase-setup'; 

const messagesRef = db.collection('messages');
const usersRef = db.collection('users');

export const getAllMessages = (cb) => async dispatch => {
    const uid = getUID();
    //const ref = db.collection('users').doc(user.uid);
    const query = messagesRef.where('users', 'array-contains', uid);
    
    query.onSnapshot((docs) => {
        docs.docChanges().forEach(change => {
            let temp = change.doc.data();
            temp = {
                ...temp,
                id: change.doc.id
            };
            let ouid;
            if (temp.users[0] === uid) {
                ouid = temp.users[1];
            } else {
                ouid = temp.users[0];
            }
            if (change.type === 'added') {
                addThread(ouid, temp, dispatch);
            }
            if (change.type === 'modified') {
                addMessages(ouid, temp, dispatch);
            }
        });
        cb();
    }, (err) => {
        console.log(err);
    });
};

const addMessages = (uid, temp, dispatch) => {
    const messages = [];
    //const thread = temp.thread;
    //console.log(temp);
    temp.thread.forEach(message => {
        const data = {
            ...message,
            created: message.created.toDate()
        };
        messages.push(data);
    });
    dispatch({
        type: UPDATE_MESSAGES,
        payload: {
            thread: messages,
            id: temp.id
        }
    });
    //console.log(messages);
};

const addThread = (uid, temp, dispatch) => {
    const messages = [];
    const thread = temp.thread;
    thread.forEach(message => {
        const data = {
            ...message,
            created: message.created.toDate()
        };
        messages.push(data);
    });
    usersRef.doc(uid).get()
    .then(user => {
        const data = { 
            thread: messages,
            user: {
                id: uid,
                ...user.data()
            },
            id: temp.id
        };
        //data.push(temp);
        dispatch({
            type: GET_MESSAGES,
            payload: data
        });
    })
    .catch(err => {
        console.log(err);
    });
};

const getUID = () => {
    return app.auth().currentUser.uid;
};

export const sendMessage = async (data) => {
    try {
        const messages = await messagesRef.doc(data.id).get();
        const threadData = messages.data();
        threadData.thread.unshift(data.content);
        messagesRef.doc(data.id).set({
            thread: threadData.thread,
            users: threadData.users
        });
    } catch (err) {
        console.log(err);
    }
};

export const startChatting = async (uid, cb) => {
    try {
        const docRef = await messagesRef.doc();
        await docRef.set({
            thread: [],
            users: [uid, getUID()]
        });
        cb();
    } catch (err) {
        cb();
        console.log(err);
    }
};
