import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBf2DNZg0mzrt8Wryt4AvcHMGa2B5PTeQc",
  authDomain: "job-tracker-ac91c.firebaseapp.com",
  projectId: "job-tracker-ac91c",
  storageBucket: "job-tracker-ac91c.firebasestorage.app",
  messagingSenderId: "85193431892",
  appId: "1:85193431892:web:502fabb92475bf2d9b86c1",
  measurementId: "G-2TYF2ZFRTT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app; 