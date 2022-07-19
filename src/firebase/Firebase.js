import firebase from 'firebase/app';
import 'firebase/firestore';

require('firebase/auth');

const prodCredentials = {
    apiKey: 'AIzaSyDsQyNOSloA_i9L9rDUjtqlpmYbsMCtwmk',
    authDomain: 'chivteisrael-25708.firebaseapp.com',
    projectId: 'chivteisrael-25708',
    storageBucket: 'chivteisrael-25708.appspot.com',
    messagingSenderId: '371600271082',
    appId: '1:371600271082:web:50a2cfa3172c3425e01993',
    measurementId: 'G-SJXCHBMRN5',
};

firebase.initializeApp(prodCredentials);

export const firestore = firebase.firestore();
export default firebase;
