import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAu9rce-zOKvB3wHeyaXHP9KAsSrpgeyNg",
  authDomain: "to-do-list2559.firebaseapp.com",
  projectId: "to-do-list2559",
  storageBucket: "to-do-list2559.appspot.com",
  messagingSenderId: "456464886948",
  appId: "1:456464886948:web:f84e8161e761e0d5fcca31",
  measurementId: "G-QNEN96ML1M"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
