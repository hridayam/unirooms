const admin = require('firebase-admin');
const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');


const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = function(req, res) {
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@sjsu.edu?/;

    const { firstName, lastName, email, password, 
        confirmPassword, username } = req.body;

    const code = Math.floor((Math.random() * 8999 + 1000))

    const newUser = {username, firstName, lastName, email, code};

    let hasError = false;
    let errors = [];

    if (!firstName) {
        hasError = true;
        errors.push('Please enter your name');
    }
    if (!lastName) {
        hasError = true;
        errors.push('Please enter your name');
    }
    if (!email) {
        hasError = true;
        errors.push('Please enter your email')
    } else if (!regex.test(email)) {
        hasError = true;
        errors.push('Please enter a valid email');
    }
    if (!password) {
        hasError = true;
        errors.push('Please enter a valid password');
    } else if (password !== confirmPassword) {
        hasError = true;
        errors.push('Please confirm your passoword');
    }
    if (!username) {
        hasError = true;
        errors.push('Please enter a username');
    }

    if (hasError) {
        return res.status(422).send({errors});
    }
    
    admin.auth().createUser({ password, email })
        .then(user => {
            return admin.firestore().collection('users').doc(`${user.email}`).set(newUser)
                        .then(() => {
                            return sendEmail(newUser.email, code, res); 
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(422).send({error: err})
                        });
        })
        .catch(err => res.status(422).send({error: err}) );
}

// Send email function
function sendEmail(email, code, res) {
    const msg = {
        to: email,
        from: 'noreply@uniroom.com',
        subject: 'uniroom account activation code',
        text: `${code}`,
        html: `Your activation code is ${code}`,
    };

    sgMail.send(msg).then(() =>
         res.json({message: "success"})
    ).catch((err) => {
        res.status(err.code).send({error: err})
        console.log(err)
    });
}
