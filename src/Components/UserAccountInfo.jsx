// src/components/UserAccountInfo.jsx
import { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

function UserAccountInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Sign-in failed:", err.message);
    }
  };

  const handleSignOut = () => signOut(auth);

  return (
    <div>
      {user ? (
        <div>
          <img src={user.photoURL} alt="avatar" />
          <span>{user.displayName}</span>
          <button onClick={handleSignOut}>Logout</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}

export default UserAccountInfo;
