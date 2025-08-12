import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const MyAppBar = () => (
  <AppBar
    position="fixed"
    sx={{
      width: "100%",
      bgcolor: "#C62828",
      zIndex: (theme) => theme.zIndex.drawer + 1,
    }}
  >
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        GestMarket
      </Typography>
    </Toolbar>
  </AppBar>
);

export default MyAppBar;
