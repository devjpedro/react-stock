import { Box, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../db/firebaseConnection";
import { ItemsContext } from "../../context/ItemsContext";
import { UserContext } from "../../context/UserContext";
import { DefaultButton } from "../DefaultButton";

export default function Header() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { matchSm } = useContext(ItemsContext);

  async function fazerLogout() {
    const confirmation = confirm("Deseja realmente sair?");
    if (confirmation) {
      await signOut(auth);
      setUser(false);
    }
  }
  return (
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
        <DefaultButton
          variantButton="error"
          text="Sair"
          handleClick={fazerLogout}
        />
      </Box>
    </Box>
  );
}
