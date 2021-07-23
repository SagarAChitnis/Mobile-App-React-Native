/*
* firebase.js
* Author: Sagar A. Chitnis
* Purpose: Configure and initialize the Firebase configuration
*/

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyB8oDVKUhUGC5YKp4EWHxue7mslJGyYHwE',
	authDomain: 'shareasnack-c6fb1.firebaseapp.com',
	databaseURL: 'https://shareasnack-c6fb1.firebaseio.com',
	projectId: 'shareasnack-c6fb1',
	storageBucket: 'shareasnack-c6fb1.appspot.com',
	messagingSenderId: '695996603124',
	appId: '1:695996603124:web:cd8465f424dfdcc52d1ca1',
	measurementId: 'G-XR2PPMPLQ0',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
