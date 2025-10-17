// firebaseConfig.js
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBLsl9TML8YuQTRBYw6NMofGYnyO4Kmhhk",
  authDomain: "chatbox-b5748.firebaseapp.com",
  databaseURL: "https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatbox-b5748",
  storageBucket: "chatbox-b5748.firebasestorage.app",
  messagingSenderId: "96012869985",
  appId: "1:96012869985:web:b918e80c1e33349fb92520",
  measurementId: "G-MJEDJVMWQP"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); 
}

export default firebase;



export const databaseURL = 'https://chatbox-b5748-default-rtdb.asia-southeast1.firebasedatabase.app';