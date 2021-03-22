import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {

            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            console.log("New user", res.user);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((res) => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
        })
}

export const handleGithubSignIn = () => {
    const gitProvider = new firebase.auth.GithubAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(gitProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = credential.accessToken;

            // The signed-in user info.
            let user = result.user;
            console.log(" Git login", user);
            return user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorCode, errorMessage)
            // ...
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name

    }).then(function () {
        console.log("user name updated")
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });
}

export const handleSignOut = () => {

    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                newUser: false,
                name: '',
                photo: '',
                email: '',
                error: '',
                success: false
            }

            console.log(res);
            return signedOutUser;
        })
        .catch(err => {
            console.log(err);
        })
}