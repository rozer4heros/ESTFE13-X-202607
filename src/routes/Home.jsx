import { useState } from "react";

import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

function Home({}) {
  const [comment, setComment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        // comment: comment,
        comment,
        date: serverTimestamp(),
      });
      setComment("");
    } catch (e) {
      console.error("글 등록 중 오류 발생:", e);
    }
  };

  return (
    <>
      <Typography variant="h2" component="h2">
        Home
      </Typography>
      <Box component="form" sx={{ m: 2 }} method="post" onSubmit={onSubmit}>
        <TextField
          sx={{ my: 1 }}
          fullWidth
          label="Comment"
          placeholder="글을 입력해주세요"
          type="text"
          name="comment"
          variant="outlined"
          multiline
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          등록
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
    </>
  );
}

export default Home;
