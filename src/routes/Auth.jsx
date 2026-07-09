import { useState } from "react";

import { authService } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

function Auth({}) {
  const [newAccount, setNewAccount] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const auth = authService;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (newAccount) {
      // 회원가입
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(userCredential);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.warn(errorCode, errorMessage);
        });
    } else {
      // 로그인
      signInWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(userCredential);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.warn(errorCode, errorMessage);
        });
    }
  };

  return (
    <>
      <Typography variant="h2" component="h2">
        {newAccount ? "회원가입 폼" : "로그인 폼"}
      </Typography>
      <Box component="form" sx={{ m: 2 }} method="post" onSubmit={onSubmit}>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="Email address"
          type="email"
          name="email"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          onChange={handleChange}
        />
        <Button sx={{ mt: 2 }} type="submit" variant="contained">
          {newAccount ? "회원가입" : "로그인"}
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Button sx={{ mt: 2 }} type="button" variant="contained" onClick={() => setNewAccount((p) => !p)}>
        {newAccount ? "로그인으로 전환" : "회원가입으로 전환"}
      </Button>
    </>
  );
}

export default Auth;
