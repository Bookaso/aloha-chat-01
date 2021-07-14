import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4lNiOzs2gWuvqM8r0XsP0C1LdwN7RKtM",
  authDomain: "aloha-chat-01-e0903.firebaseapp.com",
  projectId: "aloha-chat-01-e0903",
  storageBucket: "aloha-chat-01-e0903.appspot.com",
  messagingSenderId: "554904837138",
  appId: "1:554904837138:web:9e4c01bb2a2210cd9f4ccb"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore();