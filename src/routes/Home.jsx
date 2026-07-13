import { useEffect, useState } from "react";

import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function Home({}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  async function getComments() {
    const q = query(collection(db, "comments"));
    const querySnapshot = await getDocs(q);
    const commentArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setComments(commentArray);
  }
  useEffect(() => {
    getComments();
  }, []);

  if (comments.length > 0) console.log(comments);

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
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {/* comments배열의 값을 ListItem으로 출력 */}
        {comments.length > 0 &&
          comments.map((c, i) => (
            <ListItem key={c.id} alignItems="flex-start" divider>
              <ListItemText primary={c.comment} secondary={c.date.toDate().toLocaleString()}></ListItemText>
            </ListItem>
          ))}
      </List>
    </>
  );
}

export default Home;
