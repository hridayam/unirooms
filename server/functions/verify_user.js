// maybe not needed
const admin = require('firebase-admin');

module.exports = function(req, res) {
    const { email, code } = req.body;
    admin.auth().getUserByEmail(email)
    .then(userRecord => {
        //console.log("main");
        return verifyUser(email, code, userRecord.uid, res);
    })
    .catch(err => {
        return res.json({error: err});
    }); 
}

function verifyUser(email, code, uid, res) {
    //console.log("verifyUser");
    admin.firestore().collection('users').doc(email).get()
    .then(ref => {
        user = ref.data();
        //console.log("verifyUser then");
        //console.log(user);
        if (user.code === code) {
            //console.log("verifyUser if");
            return updateUser(uid, res);
        }
        else {
            //console.log("verifyUser else");
            return res.status(422).json({error: 'invalid code. Please Retry'});
        }
    })
    .catch(err => {
        //console.log('verifyUser Catch')
        return res.json({error: err});
    }); 
}

function updateUser(uid, res) {
    //console.log("updateUser");
    admin.auth().updateUser(uid, {
        emailVerified: true
    })
    .then(user => {
        //console.log("updateUser then");
        return res.status(200).json({ success: true });
    })
    .catch(err => {
        //console.log("updateUser catch");
        return res.json({error: err});
    }); 
}