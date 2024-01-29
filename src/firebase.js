import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAZMjPv31P0o0mZJdqIZqKsR1vn3jGJIbo",
    authDomain: "test-app-20132.firebaseapp.com",
    projectId: "test-app-20132",
    storageBucket: "test-app-20132.appspot.com",
    messagingSenderId: "619405834828",
    appId: "1:619405834828:web:f5ec098483ad11cdc752e9",
    measurementId: "G-3JQ7SFFYB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const db = getFirestore(app)