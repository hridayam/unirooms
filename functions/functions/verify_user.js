// maybe not needed
const admin = require('firebase-admin');

module.exports = function(req, res) {
    const { email, code } = req;
    var user;
    admin.auth.getUserByEmail(email)
        .then(userRecord => {
            admin.firestore().collection('users').doc(userRecord.email).get()
                .then(doc => {
                    user = doc
                    if (user.code == code) {
                        admin.auth
                    }
                })
                .catch(err => {
                    console.log(err);
                }); 
        })
}