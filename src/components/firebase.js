import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"
const config = {
  apiKey: "AIzaSyAuUM69AFNn29QklSQj1EivEDp4oPNZHSI",
  authDomain: "project-manager-37008.firebaseapp.com",
  projectId: "project-manager-37008",
  storageBucket: "project-manager-37008.appspot.com",
  messagingSenderId: "942477390776",
  appId: "1:942477390776:web:d74f0b6d7cee6e16d0554d",
  measurementId: "G-KDB2DNRF4S"
};

firebase.initializeApp(config);
//utils
const db = firebase.firestore();
db.enablePersistence({ experimentalForceOwningTab: true });
const auth = firebase.auth();
const storage = firebase.storage();
//enable persistence
export { auth, storage, db };
