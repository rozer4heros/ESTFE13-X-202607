import { useState } from "react";
import { authService } from "../firebase.js";

import Container from "@mui/material/Container";

import "./App.css";
import Router from "./Router";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  console.log(authService.currentUser);

  return (
    <Container>
      <h1>ESTFE-X</h1>
      <Router isLogin={isLogin} />
    </Container>
  );
}

export default App;
