import Firebase from "firebase/app";
import "firebase/database";
// import Config from "./Config";

export default class RealDataBase {
    // static initializeApp() {
    //        if (!Firebase.apps.length) Firebase.initializeApp(Config);
    //    }	
    constructor(refs) {
        this.refs = refs
    }

    orderByEqual(orderBy, equal) {
        // this.initializeApp()
        let db = Firebase.database()
        return db.ref(this.refs).orderByChild(orderBy).equalTo(equal).once("value")
    }
}