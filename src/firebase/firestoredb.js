import firebaseApp from './';
import 'firebase/firestore';

const firebaseDb = firebaseApp.firestore();
const settings = { timestampsInSnapshots: true };
firebaseDb.settings(settings);

export default firebaseDb;
