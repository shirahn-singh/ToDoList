import { Stack, Button } from "@mui/material";
import AuthDialog from "./AuthDialog";

function UserAccountInfo({ user, login, logout, signUp, loginWithEmail }) {
  return (
    <div>
      {user ? (
        <Stack direction="row" spacing={2} alignItems="center">
          <img src={"src/assets/cat.png"} height={30} alt="avatar" />
          <span>{user.displayName || user.email}</span>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Stack>
      ) : (
        <AuthDialog login={login} signUp={signUp} loginWithEmail={loginWithEmail} />
      )}
    </div>
  );
}

export default UserAccountInfo;
