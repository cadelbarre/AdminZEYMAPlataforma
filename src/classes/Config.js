import Firebase from "firebase/app";
import 'firebase/auth'

const Config = {
  apiKey: "AIzaSyDt8WB_f3rzVyVvFA1VVnwsXBW0fzuUcUA",
  authDomain: "admin-zeyma.firebaseapp.com",
  databaseURL: "https://admin-zeyma-default-rtdb.firebaseio.com",
  projectId: "admin-zeyma",
  storageBucket: "admin-zeyma.appspot.com",
  messagingSenderId: "379540532597",
  appId: "1:379540532597:web:5e9c5b6165ba8cfdcfb73c",
  measurementId: "G-EWZ6ZFC48R",
};

if (!Firebase.apps.length) Firebase.initializeApp(Config);

Firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    Firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    }, reject);
  });
};

export default Firebase;
