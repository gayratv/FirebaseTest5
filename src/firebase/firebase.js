
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    async register(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(
            email,
            password
        );
        return await newUser.user.updateProfile({
            displayName: name
        });
    }

    async login(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    async logout() {
        await this.auth.signOut();
    }

    async resetPassword(email) {
        await this.auth.sendPasswordResetEmail(email);
    }
}

const firebase = new Firebase();

// после get можно прочитать данные
// get().then(ReadData)
function  ReadData (querySnapshot) {
    querySnapshot.forEach(
        (doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        })
};


export {ReadData};
export default firebase;
