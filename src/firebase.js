import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD5lPEPZ7XQN08IAW2l0xQ7ISXTe8oogoA",
    authDomain: "todoornottodo-20904.firebaseapp.com",
    projectId: "todoornottodo-20904",
    storageBucket: "todoornottodo-20904.firebasestorage.app",
    messagingSenderId: "811980423854",
    appId: "1:811980423854:web:67d83d273d604ec925233f",
    measurementId: "G-QXKKPYN63J"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };