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
    console.log('getting users');
            try {
            const allUsers = await usersRef.get();
            const currUser = await usersRef.doc(getUID()).get();
            const currData = currUser.data();

            const currUserSmoking = currData.smoking;
            const currUserAlcohol = currData.drinking;
            const currUserreligion = currData.religion;
            const currUserDrugs = currData.drugs;
            const currUserEthnicity = currData.ethnicity;

            const currUserLifestyle = currData.lifestyle;
            const currUserPersonality = currData.personality;
            let personalitiesCount = 0;
            let lifestyleCount = 0;

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
                    const otherRef = u.data();

                    // yes sometimes no
                    const otherUserSmoking = otherRef.smoking;
                    // often sometimes never
                    const otherUserDrugs = otherRef.drugs;
                    // 1 0
                    const otherUserReligion = otherRef.religion;
                    // socially -> socially, not at all, often 1, 0.4, 0
                    // often -> often, socially, not at all 1, 0.4, 0
                    // not at all -> not at all, socially, often 1, 0.4, 0
                    const otherUserAlcohol = otherRef.drinking;
                    // 1 0
                    const otherUserEthnicity = otherRef.ethnicity;

                    let prior = 0;

                    if(otherUserReligion === currUserreligion)
                    {
                        prior++;
                    }

                    if(otherUserEthnicity === currUserEthnicity)
                    {
                        prior++;
                    }

                    if(otherUserAlcohol === currUserAlcohol)
                    {
                        prior++;
                    }
                    else if(currUserAlcohol === 'Often' || currUserAlcohol === 'Not at all')
                    {
                        if(otherUserAlcohol === 'Socially')
                        {
                            prior = prior + 0.35;
                        }
                    }
                    else if(otherUserAlcohol === 'Not at all')
                    {
                        prior = prior + 0.35;
                    }

                    if(otherUserDrugs === currUserDrugs)
                    {
                        prior++;
                    }
                    else if(currUserDrugs === 'Often' || currUserDrugs === 'Never')
                    {
                        if(otherUserDrugs === 'Sometimes')
                        {
                            prior = prior + 0.35;
                        }
                    }
                    else if(otherUserDrugs === 'Never')
                    {
                        prior = prior + 0.35;
                    }

                    if(otherUserSmoking === currUserSmoking)
                    {
                        prior++;
                    }
                    else if(currUserSmoking === 'Yes' || currUserSmoking === 'No')
                    {
                        if(otherUserSmoking === 'Sometimes')
                        {
                            prior = prior + 0.35;
                        }
                    }
                    else if(otherUserSmoking === 'No')
                    {
                        prior = prior + 0.35;
                    }

                    prior = (prior/5)*100;

                    const otherUserLifestyle = otherRef.lifestyle;
                    const otherUserPersonality = otherRef.personality;

                    otherUserLifestyle.forEach(lifestyle => {
                        if(currUserLifestyle.includes(lifestyle))
                        {
                            lifestyleCount++;
                        }
                    });

                    otherUserPersonality.forEach(personality => {
                        if(currUserPersonality.includes(personality))
                        {
                            personalitiesCount++;
                        }
                    });

                    let plus = ((lifestyleCount+personalitiesCount)/(otherUserLifestyle.length + otherUserPersonality.length))*100;

                    data.push({
                        ...u.data(),
                        id: u.id,
                        prior: prior,
                        plus: plus
                    });

                    data.sort((a, b) => parseFloat(a.prior) - parseFloat(b.prior));
                    data.reverse();

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
}

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
