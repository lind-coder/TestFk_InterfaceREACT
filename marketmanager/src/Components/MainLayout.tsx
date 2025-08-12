import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import MyAppBar from "../Components/AppBar";
import MySidebar from "../Components/MySidebar";

const drawerWidth = 200;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedView = (() => {
    if (location.pathname.includes("/supermarket")) return "Supermarket";
    if (location.pathname.includes("/employee")) return "Employee";
    if (location.pathname.includes("/shifts")) return "Shifts";
    if (location.pathname.includes("/contacts")) return "Contacts";

    return "Welcome";
  })();

  const handleSetSelectedView = (view: string) => {
    switch (view) {
      case "Employee":
        navigate("/employees");
        break;
      case "Supermarket":
        navigate("/markets");
        break;
      case "Shifts":
        navigate("/shifts");
        break;
      case "Contacts":
        navigate("/contacts");
        break;
      default:
        navigate("/"); // Welcome
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MyAppBar />
      <MySidebar
        drawerWidth={drawerWidth}
        selectedView={selectedView}
        setSelectedView={handleSetSelectedView}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          backgroundImage: 'url("/Asset/supermarket.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflowY: "auto",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            bgcolor: "rgba(198, 40, 40, 0.32)",
            borderRadius: 2,
            p: 4,
            minHeight: "80vh",
            mt: 8,
            mx: "auto",
            mb: 2,
            width: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
