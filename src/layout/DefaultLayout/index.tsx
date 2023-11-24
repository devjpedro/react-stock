import { Box } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { ItemsContext } from "../../context/ItemsContext";

export function DefaultLayout() {
  const { matchSm } = useContext(ItemsContext);

  return (
    <>
      <Header />
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        px={matchSm ? 3 : 5}
        py={3}
      >
        <Outlet />
      </Box>
    </>
  );
}
