import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { authService, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import Comment from "../components/Comment";

function Profile() {
  const [comments, setComments] = useState([]);
  const auth = authService;
  const userId = auth.currentUser.uid;
  const navigate = useNavigate();

  const getComments = async () => {
    const q = query(collection(db, "comments"), where("uid", "==", userId), orderBy("date", "desc"));

    onSnapshot(q, (querySnapShot) => {
      const commentsArray = querySnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(commentsArray);
    });
  };
  useEffect(() => {
    getComments();
  }, []);

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
      <Divider sx={{ my: 3 }} />
      <List sx={{ width: "100%" }}>
        {comments.map((c) => (
          <Comment key={c.id} item={c} isShown={userId === c.uid} />
        ))}
      </List>
    </>
  );
}

export default Profile;
