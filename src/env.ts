import firebase from 'firebase'

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD_zil28Hx4NRK-d3ISdt5lp54q-6f7va0",
  authDomain: "cesi-meteo-c4702.firebaseapp.com",
  databaseURL: "https://cesi-meteo-c4702.firebaseio.com",
  projectId: "cesi-meteo-c4702",
  storageBucket: "cesi-meteo-c4702.appspot.com",
  messagingSenderId: "763835044300",
  appId: "1:763835044300:web:b36fcc62cf76e049f48d69"
};

firebase.initializeApp(FIREBASE_CONFIG);

export const DB = firebase.firestore();