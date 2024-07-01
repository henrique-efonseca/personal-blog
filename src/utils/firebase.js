// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'aerobic-flare-279422.firebaseapp.com',
  projectId: 'aerobic-flare-279422  ',
  storageBucket: 'aerobic-flare-279422.appspot.com',
  messagingSenderId: '1042423433120',
  appId: '1:1042423433120:web:9dc362f1af106c046146c5',
  measurementId: 'G-7WYLNNR811',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
