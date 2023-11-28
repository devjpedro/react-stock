import { Logout } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../db/firebaseConnection";
import { ItemsContext } from "../../context/ItemsContext";
import { UserContext } from "../../context/UserContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 250,
  bgcolor: "#202020",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 3,
};

export default function Header() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { setUser } = useContext(UserContext);
  const { matchSm } = useContext(ItemsContext);

  async function fazerLogout() {
    await signOut(auth);
    setUser(false);
  }
  return (
    <>
      <Modal open={open} onClose={handleClose} disableAutoFocus>
        <Box sx={style} textAlign="center" width={matchSm ? 300 : 400}>
          <Typography variant="h5" fontWeight="700" component="h2">
            Quer mesmo sair?
          </Typography>
          <Box
            display="flex"
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" onClick={handleClose}>
              Voltar
            </Button>
            <Button onClick={fazerLogout} variant="contained" color="error">
              Sair
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        component="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={matchSm ? 3 : 5}
        py={3}
      >
        <Typography
          textTransform="uppercase"
          fontWeight="900"
          variant="h6"
          color={"var(--purple-500)"}
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          React Stock
        </Typography>
        <Box display="flex" gap={matchSm ? 2 : 4} alignItems="center">
          <NavLink to="/">
            <Typography
              sx={{
                "&:hover": {
                  color: "var(--purple-500)",
                },
                transition: ".2s",
              }}
            >
              Início
            </Typography>
          </NavLink>
          <NavLink to="/estoque">
            <Typography
              sx={{
                "&:hover": {
                  color: "var(--purple-500)",
                },
                transition: ".2s",
              }}
            >
              Itens
            </Typography>
          </NavLink>
          <Button
            sx={{
              background: "#101010",
              "&:hover": {
                background: "#c62828",
              },
            }}
            variant="contained"
            onClick={handleOpen}
          >
            <Logout />
          </Button>
        </Box>
      </Box>
    </>
  );
}
