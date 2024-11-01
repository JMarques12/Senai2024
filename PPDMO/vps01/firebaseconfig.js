import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyCdGqZpSIxy2NrEsAIyiYxp55PGV1biZFs",
    authDomain: "livros-5f72d.firebaseapp.com",
    projectId: "livros-5f72d",
    storageBucket: "livros-5f72d.appspot.com",
    messagingSenderId: "963610492087",
    appId: "1:963610492087:web:8078441e43ac0b955c2132",
    measurementId: "G-ETDLKXNJKV"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const auth = getAuth(app);
  export const storage = getStorage(app);

    export {db, auth};