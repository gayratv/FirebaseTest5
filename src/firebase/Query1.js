import firebase from "firebase";

const db = firebase.db;

let query = firebase.firestore().collection('restaurants');

uery = query.where('category', '==', '');