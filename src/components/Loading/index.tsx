import { Backdrop, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export function Loading() {
  const { loading } = useContext(UserContext);
  return (
    <Backdrop
      open={loading}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress />
    </Backdrop>
  );
}
