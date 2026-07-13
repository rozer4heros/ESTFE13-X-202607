import { useEffect, useState } from "react";

import { authService } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import Container from "@mui/material/Container";

import "./App.css";
import Router from "./Router";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [init, setInit] = useState(false);
  const [userId, setUserId] = useState(null);
  const auth = authService;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUserId(user.uid);
        setIsLogin(true);
      } else {
        // User is signed out
        setIsLogin(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <Container>
      <h1>ESTFE-X</h1>
      {init ? <Router isLogin={isLogin} userId={userId} /> : <h2>사용자 정보를 불러오고 있습니다...</h2>}
    </Container>
  );
}

export default App;
