import { useEffect, useRef, useState } from "react";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import Comment from "../components/Comment";

function Home({ userId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [attachment, setAttachment] = useState(null);

  const fileInputRef = useRef(null);

  const getComments = async () => {
    const q = query(collection(db, "comments"), orderBy("date", "desc"), limit(5));

    onSnapshot(q, (querySnapShot) => {
      const commentsArray = querySnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(commentsArray);
    });
  };
  useEffect(() => {
    getComments();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        // comment: comment,
        comment,
        date: serverTimestamp(),
        uid: userId,
      });
      setComment("");
      // getComments();
    } catch (e) {
      console.error("글 등록 중 오류 발생:", e);
    }
  };
  const onFileChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      setAttachment(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  const onClearFile = () => {
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
        <Box sx={{ my: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Button component="label" type="button" variant="outlined" startIcon={<UploadFileIcon />}>
            이미지 선택
            <input type="file" hidden accept="image/*" onChange={onFileChange} ref={fileInputRef} />
          </Button>
          {attachment && (
            <>
              <Box
                component="img"
                src={attachment}
                alt="미리보기"
                sx={{ width: 50, height: 50, objectFit: "cover", border: "1px solid #ddd", borderRadius: 3 }}
              ></Box>
              <Button type="button" color="error" variant="outlined" size="small" onClick={onClearFile}>
                취소
              </Button>
            </>
          )}
        </Box>
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          등록
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
      <List sx={{ width: "100%" }}>
        {comments.map((c) => (
          <Comment key={c.id} item={c} isShown={userId === c.uid} />
        ))}
      </List>
    </>
  );
}

export default Home;
