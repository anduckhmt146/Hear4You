// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCOEozrY3KnWX_9KSl2QbK3dRwJexHeEvc",
  authDomain: "hearyou-atwareminathon.firebaseapp.com",
  projectId: "hearyou-atwareminathon",
  storageBucket: "hearyou-atwareminathon.appspot.com",
  messagingSenderId: "527718227474",
  appId: "1:527718227474:web:bb6fba56637e87711342cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app)