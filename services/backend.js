// backend.js
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  query,
  orderByChild,
  equalTo
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCM3EESzn0vyMfwApqSeVA8-dCeYueVwHo",
  authDomain: "lablink-trial.firebaseapp.com",
  databaseURL: "https://lablink-trial-default-rtdb.firebaseio.com",
  projectId: "lablink-trial",
  storageBucket: "lablink-trial.appspot.com",
  messagingSenderId: "852564074940",
  appId: "1:852564074940:web:4edceb7244cc15527c4bb9",
  measurementId: "G-YXPCGBWKWM"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {
  db,
  ref,
  set,
  onValue,
  remove,
  query,
  orderByChild,
  equalTo
};
