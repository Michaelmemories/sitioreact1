// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDHgI3z79LtmO7UpC8lYcQleVY1HrisY-4',
    authDomain: 'fb-bdreact1-3a320.firebaseapp.com',
    projectId: 'fb-bdreact1-3a320',
    storageBucket: "fb-bdreact1-3a320.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;
