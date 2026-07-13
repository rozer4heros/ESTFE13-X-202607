import { useState } from "react";

import { db } from "../firebase";
import { doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";

import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Comment({ item, isShown }) {
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(item.comment);

  const toggleEditMode = () => {
    setEdit((prev) => !prev);
  };
  const handleDelete = async () => {
    if (window.confirm("정말로 삭제할까요?")) {
      await deleteDoc(doc(db, "comments", item.id));
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const commentRef = doc(db, "comments", item.id);
    await updateDoc(commentRef, { comment });
    setEdit(false);
  };

  return (
    <ListItem alignItems="flex-center" divider>
      {edit ? (
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
          <Stack direction="row" spacing={1}>
            <Button sx={{ m: 1 }} type="submit" variant="contained">
              수정
            </Button>
            <Button sx={{ m: 1 }} type="button" variant="outlined" onClick={() => setEdit(false)}>
              취소
            </Button>
          </Stack>
        </Box>
      ) : (
        <>
          <ListItemText
            primary={item.comment}
            secondary={item.date ? item.date.toDate().toLocaleString() : "Datetime Unknown"}
          />
          {isShown && (
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" color="primary" size="small" onClick={toggleEditMode}>
                수정
              </Button>
              <Button variant="contained" color="error" size="small" onClick={handleDelete}>
                삭제
              </Button>
            </Stack>
          )}
        </>
      )}
    </ListItem>
  );
}

export default Comment;
