import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyC1sqpAXPpIgXHa2H7ZOFFw_JNBnLr4mhk',
  authDomain: 'chat-9bd19.firebaseapp.com',
  databaseURL: 'https://chat-9bd19.firebaseio.com',
  projectId: 'chat-9bd19',
  storageBucket: 'chat-9bd19.appspot.com',
  messagingSenderId: '689331837342',
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
