import Firebase from "firebase/app";
import "firebase/auth";

export default class Auth {
  static signInUser(email, password) {
    let db = Firebase.auth();
    return db.signInWithEmailAndPassword(email, password);
  }

  static currentUser() {
    let db = Firebase.auth();
    return db.currentUser;
  }

  static logOutSession() {
    let db = Firebase.auth();
     return db.signOut();
  }

  static recoveryPassword(email) {
    var auth = Firebase.auth();
    return auth.sendPasswordResetEmail(email);
  }
}
