import { useState } from "react";

import { authService } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import Container from "@mui/material/Container";

import "./App.css";
import Router from "./Router";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const auth = authService;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      setIsLogin(true);
      console.log(user);
    } else {
      // User is signed out
      setIsLogin(false);
    }
  });

  return (
    <Container>
      <h1>ESTFE-X</h1>
      <Router isLogin={isLogin} />
    </Container>
  );
}

export default App;
