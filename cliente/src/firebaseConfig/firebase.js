import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAX2Hlqjf0zsUBzKVc88bZIvKYjj8yQ-ZU",
  authDomain: "crud-firebase-react-5f86f.firebaseapp.com",
  projectId: "crud-firebase-react-5f86f",
  storageBucket: "crud-firebase-react-5f86f.appspot.com",
  messagingSenderId: "1076536771865",
  appId: "1:1076536771865:web:5360c924d07f4936edb188"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)