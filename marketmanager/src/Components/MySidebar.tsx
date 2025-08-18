import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useNavigate } from "react-router-dom";

interface Props {
  drawerWidth: number;
  selectedView: string;
  setSelectedView: (view: string) => void;
}

const MySidebar = ({ drawerWidth, selectedView, setSelectedView }: Props) => {
  const navigate = useNavigate();

  const handleNavigation = (view: string, path: string) => {
    setSelectedView(view);
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        bgcolor: "rgb(198, 40, 40)",
        color: "#fff",
        height: "100vh",
        pt: 8,
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column", gap: 2, px: 1 }}>
        <ListItemButton
          selected={selectedView === "Welcome"}
          onClick={() => handleNavigation("Welcome", "/")}
          sx={{ py: 2, borderRadius: 2 }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <HomeIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ color: "#fff" }} />
        </ListItemButton>

        <ListItemButton
          selected={selectedView === "Supermarket"}
          onClick={() => handleNavigation("Supermarket", "/markets")}
          sx={{ py: 2, borderRadius: 2 }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <StoreIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Supermercati" sx={{ color: "#fff" }} />
        </ListItemButton>

        <ListItemButton
          selected={selectedView === "Employee"}
          onClick={() => handleNavigation("Employee", "/employees")}
          sx={{ py: 2, borderRadius: 2 }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <PeopleIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Dipendenti" sx={{ color: "#fff" }} />
        </ListItemButton>

        <ListItemButton
          selected={selectedView === "Shifts"}
          onClick={() => handleNavigation("Shifts", "/shifts")}
          sx={{ py: 2, borderRadius: 2 }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <AccessTimeIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Turni" sx={{ color: "#fff" }} />
        </ListItemButton>

        <ListItemButton
          selected={selectedView === "Contacts"}
          onClick={() => handleNavigation("Contacts", "/contacts")}
          sx={{ py: 2, borderRadius: 2 }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <ContactsIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Contatti" sx={{ color: "#fff" }} />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default MySidebar;
