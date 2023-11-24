import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ItemsContextProvider } from "./context/ItemsContext";
import { UserContextProvider } from "./context/UserContext";
import RoutesApp from "./routes";
import { DefaultTheme } from "./theme/DefaultTheme";

export function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <BrowserRouter>
        <UserContextProvider>
          <ItemsContextProvider>
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              draggable
              theme="dark"
            />
            <RoutesApp />
          </ItemsContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
