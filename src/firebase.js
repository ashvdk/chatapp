import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA738-i7L9iXa9pfu9anu8IrLRFnu9yXAI",
  authDomain: "whatsappclone-1b4fd.firebaseapp.com",
  databaseURL: "https://whatsappclone-1b4fd.firebaseio.com",
  projectId: "whatsappclone-1b4fd",
  storageBucket: "whatsappclone-1b4fd.appspot.com",
  messagingSenderId: "541186087806",
  appId: "1:541186087806:web:8f8398e7750f5ddf20312f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export { auth, provider };
export default db;
