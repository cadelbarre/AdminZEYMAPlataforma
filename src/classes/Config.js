import Firebase from "firebase/app";
import VueRouter from "@/router/index";
import VueStore from "@/store/index";

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

Firebase.auth().onAuthStateChanged( user => {
	if (user) {
		VueStore.dispatch('user/addReqAuth');
		VueStore.dispatch('clients/fetchClientsList');
		VueRouter.push('/dashboard')
	} else {
		console.error("no login");
	}
});
console.log(VueStore.getters['user/isUserLoggedIn'])

export default Firebase;
