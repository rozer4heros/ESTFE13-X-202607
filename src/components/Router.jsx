import { Routes, Route } from "react-router";

import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";
import EditProfile from "../routes/EditProfile";

function Router({ isLogin }) {
  return (
    <>
      <Routes>{isLogin ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Auth />} />}</Routes>
    </>
  );
}

export default Router;
