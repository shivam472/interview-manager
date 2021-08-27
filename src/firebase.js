import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6be-xxEUyprTUxUPXWyyzyuvyXGdJRCA",
  authDomain: "interview-manager-232ee.firebaseapp.com",
  projectId: "interview-manager-232ee",
  storageBucket: "interview-manager-232ee.appspot.com",
  messagingSenderId: "737843569555",
  appId: "1:737843569555:web:c49e90cf44ea444f53be66",
  measurementId: "G-YYGZ9WVXBF",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
