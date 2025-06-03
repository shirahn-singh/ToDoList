import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from "@mui/material";
import AuthForm from "./AuthForm";

function AuthDialog({ login, signUp, loginWithEmail }) {
  const [open, setOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Sign In
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isRegistering ? "Create Account" : "Sign In"}</DialogTitle>
        <DialogContent>
          <AuthForm
            isRegistering={isRegistering}
            setIsRegistering={setIsRegistering}
            login={login}
            signUp={signUp}
            loginWithEmail={loginWithEmail}
            closeDialog={() => setOpen(false)}
            dialogOpen = {open}
          />
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={login}
          >
            Continue with Google
          </Button>
          <Typography
            variant="body2"
            sx={{ mt: 2, cursor: "pointer", textAlign: "center" }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Already have an account? Sign in"
              : "Don't have an account? Register"}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AuthDialog;
