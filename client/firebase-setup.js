import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyA6fPurbpOopU918zzG4YEiuXrIjWita2U',
    authDomain: 'uniroom-project.firebaseapp.com',
    databaseURL: 'https://uniroom-project.firebaseio.com',
    projectId: 'uniroom-project',
    storageBucket: 'uniroom-project.appspot.com',
    messagingSenderId: '942380097329'
};
const app = firebase.initializeApp(config);

const firestore = firebase.firestore(app);
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

const db = firestore;

export { app, db };
