import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import MyAppBar from "../Components/AppBar";
import MySidebar from "../Components/MySidebar";
import { useState, useEffect } from "react";

const drawerWidth = 200;

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedView, setSelectedView] = useState("Welcome");

  // Aggiorna selectedView in base al percorso
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/markets")) setSelectedView("Supermarket");
    else if (path.startsWith("/market/") && path.includes("/employees"))
      setSelectedView("Employee");
    else if (path.startsWith("/employee/")) setSelectedView("Shifts");
    else if (path.startsWith("/employees")) setSelectedView("Employee");
    else if (path.startsWith("/shifts")) setSelectedView("Shifts");
    else if (path.startsWith("/contacts")) setSelectedView("Contacts");
    else setSelectedView("Welcome");
  }, [location.pathname]);

  const handleSetSelectedView = (view: string) => {
    setSelectedView(view);
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
        navigate("/");
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
}

export default MainLayout;
