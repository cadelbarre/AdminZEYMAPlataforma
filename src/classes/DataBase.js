import Firebase from "firebase/app";
import "firebase/database";

export default class RealDataBase {
    constructor(refs) {
        this.refs = refs
    }

    orderByEqual(orderBy, equal) {
        let db = Firebase.database()
        return db.ref(this.refs).orderByChild(orderBy).equalTo(equal).once("value")
    }
    
    fetchData(orderBy){
        let db = Firebase.database()
        return db.ref(this.refs).orderByChild(orderBy).once('value')
    }
}