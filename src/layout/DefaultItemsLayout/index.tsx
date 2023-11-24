import { Box, Typography } from "@mui/material";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import styles from "./styles.module.css";

export function DefaultItemsLayout() {
  return (
    <Box>
      <Box
        component="header"
        borderBottom={"1px solid var(--white)"}
        mb={5}
        pb={3}
      >
        <Typography component="h1" variant="h4" mb={5}>
          Stock Itens
        </Typography>
        <Box component="nav" display="flex" gap={4} mx={3}>
          <CustomNavLink to="/estoque">Todos os Itens</CustomNavLink>
          <CustomNavLink to="/estoque/adicionar-item">Novo Item</CustomNavLink>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
}

interface ICustomNavLinkProps {
  to: string;
  children: React.ReactNode;
}

function CustomNavLink({ to, children }: ICustomNavLinkProps) {
  let match = useMatch(to);
  return (
    <NavLink to={to} className={match ? styles.active : ""}>
      {children}
    </NavLink>
  );
}
