import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import fbConfig from '../configs/firebase';

firebase.initializeApp(fbConfig);
firebase.firestore();

export default firebase;

