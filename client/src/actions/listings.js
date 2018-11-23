import axios from 'axios';

import { GET_MESSAGES, UPDATE_MESSAGES } from './types';
import { app, db, firebase } from '../../firebase-setup'; 

const listingsRef = db.collection('listings');

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
