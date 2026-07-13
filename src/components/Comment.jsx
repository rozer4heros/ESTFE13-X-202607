import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Comment({ item, isShown }) {
  return (
    <ListItem alignItems="flex-center" divider>
      <ListItemText
        primary={item.comment}
        secondary={item.date ? item.date.toDate().toLocaleString() : "Datetime Unknown"}
      ></ListItemText>
      {isShown && (
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="primary" size="small">
            수정
          </Button>
          <Button variant="contained" color="error" size="small">
            삭제
          </Button>
        </Stack>
      )}
    </ListItem>
  );
}

export default Comment;
