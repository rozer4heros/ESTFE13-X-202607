import { useNavigate } from "react-router";

import { authService } from "../firebase";
import { signOut } from "firebase/auth";

import Button from "@mui/material/Button";

function Profile({}) {
  const auth = authService;
  const navigate = useNavigate();

  const onLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.warn(error);
      });
  };

  return (
    <>
      <h2>Profile</h2>
      <Button sx={{ my: 2 }} type="button" variant="contained" color="error" onClick={onLogOut}>
        로그아웃
      </Button>
    </>
  );
}

export default Profile;
