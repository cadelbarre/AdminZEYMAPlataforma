import Firebase from "firebase/app";
import "firebase/auth";
// import Config from "./Config";

export default class Auth {
    // static initializeApp() {
    //     if (!Firebase.apps.length) Firebase.initializeApp(Config);
    // }

    static signInUser(email, password) {
        // this.initializeApp()
        let db = Firebase.auth();
        return db.signInWithEmailAndPassword(email, password)
    }

    static logOutSession(){
        // this.initializeApp()
        let db = Firebase.auth();
        return db.signOut()
    }

    static recoveryPassword(email) {
        // this.initializeApp()
        var auth = Firebase.auth();
        return auth.sendPasswordResetEmail(email)
    }

}