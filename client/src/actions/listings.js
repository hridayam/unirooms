import { GET_LISTINGS, GET_FAVORITE_LISTINGS, GET_CURRENT_USER_LISTINGS } from './types';
import { app, db, firebase } from '../../firebase-setup'; 

const listingsRef = db.collection('listings');
const usersRef = db.collection('users');

export const createReservation = (data, cb) => async dispatch => {
    try {
        const ref = await listingsRef.add(data.info);
        data.images.forEach(async (image, i) => {
            const uri = await uploadImage(image, i, ref);
            const newData = listingsRef.doc(ref.id).update({
                images: firebase.firestore.FieldValue.arrayUnion(uri)
            });
            if (i === data.images.length - 1) {
                cb(null, newData);
            }
        });
    } catch (err) {
        console.log(err);
        cb(err);
    }
};

const uploadImage = async (image, i, ref) => {
    const base64Img = `data:image/jpg;base64,${image}`;
    const apiUrl = 'https://api.cloudinary.com/v1_1/dvt7vxvkz/image/upload';
    const data = {
        file: base64Img,
        upload_preset: 'unirooms-listings',
        folder: `listings/${ref.id}`,
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
        console.log(err);
    }
};

export const getFavorites = (favorites, cb) => async dispatch => {
    const listings = [];
    favorites.forEach(async (id, index) => {
        try {
            const listing = await listingsRef.doc(id).get();
            let data = listing.data();
            data.date = data.date.toDate();
            const user = await usersRef.doc(data.userId).get();

            data = {
                ...data,
                user: {
                    ...user.data(),
                    id: data.userId
                },
                id: listing.id
            };
            delete data.userId;
            listings.push(data);

            if (index === favorites.length - 1) {
                dispatch({
                    type: GET_FAVORITE_LISTINGS,
                    payload: listings
                });
                cb();
            }
        } catch (err) {
            console.log(err);
            cb(err);
        }
    });
};

export const getUserListings = (user, cb) => async dispatch => {
    const listings = [];
    const uid = app.auth().currentUser.uid;
    const query = listingsRef.where('userId', '==', uid);
    try {
        const docsSnapshot = await query.get();

        docsSnapshot.docs.forEach((doc, index) => {
            let data = doc.data();
            data.date = data.date.toDate();
            data = {
                ...data,
                user,
                id: doc.id
            };
            delete data.userId;
            listings.push(data);

            if (index === docsSnapshot.docs.length - 1) {
                dispatch({
                    type: GET_CURRENT_USER_LISTINGS,
                    payload: listings
                });
                cb();
            }
        });
    } catch (err) {
        console.log(err);
        cb(err);
    }
};

let first = null; 
let lastVisible = null;
const pageSize = 5;

export const getReservations = (cb) => async dispatch => {
    const listings = [];
    first = listingsRef.orderBy('date', 'desc').limit(pageSize);
    if (lastVisible) {
        first = first.startAfter(lastVisible);
    }
    
    try {
        const documentSnapshots = await first.get();
        lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        documentSnapshots.docs.forEach(async (doc, i) => {
            let data = doc.data();
            data.date = data.date.toDate();
            try {
                const user = await usersRef.doc(data.userId).get();
                data = {
                    ...data,
                    user: {
                        ...user.data(),
                        id: data.userId
                    },
                    id: doc.id
                };
                delete data.userId;
                listings.push(data);
                //console.log('last', lastVisible.data(), 'end');
                if (doc.id === lastVisible.id) {
                    dispatch({
                        type: GET_LISTINGS,
                        payload: listings
                    });
                    cb();
                }
            } catch (err) {
                console.log(err); 
                cb(err);
            }
        });
    } catch (err) {
        console.log(err); 
        cb(err); 
    }
};
