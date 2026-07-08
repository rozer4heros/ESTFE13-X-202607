import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { firebase } from "./firebase.js";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./components/App.jsx";

console.log(firebase);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
