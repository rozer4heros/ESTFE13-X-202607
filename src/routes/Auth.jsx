import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Auth({}) {
  const [newAccount, setNewAccount] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  console.log(form);

  return (
    <>
      <Typography variant="h2" component="h2">
        Login Form
      </Typography>
      <Box
        component="form"
        sx={{ m: 2 }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
          Login
        </Button>
      </Box>
    </>
  );
}

export default Auth;
