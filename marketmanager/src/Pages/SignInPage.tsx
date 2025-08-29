import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const providers = [{ id: "credentials", name: "Credentials" }];

const BRANDING = {
  logo: (
    <StorefrontOutlinedIcon
      sx={{ color: "rgb(198, 40, 40)", width: "45px", height: "45px" }}
    />
  ),
  title: "GestMarket",
};

// Tema rosso semplice
const redTheme = createTheme({
  palette: {
    background: {
      default: "#C62828", // sfondo rosso
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#C62828",
          color: "white",
          "&:hover": {
            backgroundColor: "#8E0000", // rosso scuro hover
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(198, 40, 40, 0.5)",
            color: "white",
          },
        },
      },
    },
  },
});

const signIn: (provider: AuthProvider) => void = async (provider) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve();
    }, 500);
  });
};

export default function GestMarketSignInPage() {
  return (
    <ThemeProvider theme={redTheme}>
      <AppProvider branding={BRANDING} theme={redTheme}>
        <SignInPage
          signIn={signIn}
          providers={providers}
          slotProps={{
            emailField: { autoFocus: false },
            form: { noValidate: true },
          }}
        />
      </AppProvider>
    </ThemeProvider>
  );
}
