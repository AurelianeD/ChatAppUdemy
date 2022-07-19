import firebase from 'firebase/app';
import 'firebase/firestore';
import {project} from 'react-native/react-native.config';

require('firebase/auth');

const prodCredentials = {
    apiKey: 'AIzaSyDvx3hFbEk0eaSo-shl2u0Ly5IK-uLWe9k',
    authDomain: 'udemychatapp-63fba.firebaseapp.com',
    projectId: 'udemychatapp-63fba',
    storageBucket: 'udemychatapp-63fba.appspot.com',
    messagingSenderId: '805531774827',
    appId: '1:805531774827:web:b85311524b6b73a986e62e',
};

firebase.initializeApp(prodCredentials);

export const firestore = firebase.firestore();
export default firebase;
