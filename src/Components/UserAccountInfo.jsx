import { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { Button, Stack } from "@mui/material";

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
          <img src={"src/assets/cat.png"} height={30} alt="avatar" />
          <span>{user.displayName}</span>
          <button onClick={handleSignOut}>Logout</button>
        </div>
      ) : (
        <Stack  direction="row" spacing={1}>
        <Button variant="contained" onClick={handleSignIn}>Register</Button>
        <Button variant="contained" onClick={handleSignIn}>Sign in</Button>
        </Stack>
      )}
    </div>
  );
}

export default UserAccountInfo;
