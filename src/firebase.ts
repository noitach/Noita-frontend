import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCaK12v58_79p_f_kJ3dRy6VLSSGrWsRZg",
    authDomain: "noita-website.firebaseapp.com",
    projectId: "noita-website",
    storageBucket: "noita-website.firebasestorage.app",
    messagingSenderId: "982182162415",
    appId: "1:982182162415:web:f2c7c8d6a5a9210cc2101a",
    measurementId: "G-PF9GKY2BR8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 