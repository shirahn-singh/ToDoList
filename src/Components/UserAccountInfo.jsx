import { Button, Stack } from "@mui/material";

function UserAccountInfo({user, login, logout}) {
  return (
    <div>
      {user ? (
        <div>
          <img src={"src/assets/cat.png"} height={30} alt="avatar" />
          <span>{user.displayName}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Stack  direction="row" spacing={1}>
        <Button variant="contained" onClick={login}>Register</Button>
        <Button variant="contained" onClick={login}>Sign in</Button>
        </Stack>
      )}
    </div>
  );
}

export default UserAccountInfo;
