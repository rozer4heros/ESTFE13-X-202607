import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

function Home({}) {
  return (
    <>
      <Typography variant="h2" component="h2">
        Home
      </Typography>
      <Box component="form" sx={{ m: 2 }} method="post">
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
        />
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          작성
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
    </>
  );
}

export default Home;
