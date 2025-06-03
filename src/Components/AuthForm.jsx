import { useState } from "react";
import {
  TextField,
  Button,
  Typography
} from "@mui/material";
import { updateProfile } from "firebase/auth";

function AuthForm({
  isRegistering,
  setIsRegistering,
  login,
  signUp,
  loginWithEmail,
  closeDialog
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await signUp(email, password);
        await updateProfile(userCredential.user, { displayName: username });
      } else {
        userCredential = await loginWithEmail(email, password);
      }

      setEmail('');
      setPassword('');
      setUsername('');
      setError('');
      closeDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {isRegistering && (
        <TextField
          label="Username"
          fullWidth
          margin="dense"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <TextField
        label="Email"
        fullWidth
        margin="dense"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="dense"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        {isRegistering ? "Register" : "Sign In"}
      </Button>
    </>
  );
}

export default AuthForm;
