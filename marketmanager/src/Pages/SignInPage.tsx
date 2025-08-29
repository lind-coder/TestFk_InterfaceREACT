import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const providers = [{ id: "credentials", name: "Credentials" }];

const BRANDING = {
  logo: (
    <img
      src="https://mui.com/static/logo.svg"
      alt="MUI logo"
      style={{ height: 24 }}
    />
  ),
  title: "GestMarket",
};

// Tema rosso semplice
const redTheme = createTheme({
  palette: {
    background: {
      default: "rgb(198, 40, 40)", // sfondo rosso
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(198, 40, 40)",
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
