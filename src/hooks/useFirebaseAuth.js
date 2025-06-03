import { useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from "firebase/auth";

import { auth, provider } from "../firebase";

function useFirebaseAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const login = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);


  return { user, login, logout, signUp, loginWithEmail };
}

export default useFirebaseAuth;
