import { Link } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Nav({}) {
  return (
    <>
      <Box component="nav" sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button component={Link} to="/" variant="text">
          Home
        </Button>
        <Button component={Link} to="/profile" variant="text">
          Profile
        </Button>
      </Box>
    </>
  );
}

export default Nav;
