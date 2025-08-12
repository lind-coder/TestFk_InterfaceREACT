import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const WelcomeScreen = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
      >
        Benvenuto in GestMarket!
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, color: "#fff" }}>
        Seleziona una voce dal menu per iniziare.
      </Typography>
    </Box>
  );
};

export default WelcomeScreen;
