import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { isSameWeek } from "date-fns";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/DefaultButton";
import { ItemProps, ItemsContext } from "../../context/ItemsContext";

export function Home() {
  const navigate = useNavigate();
  const { items, matchSm } = useContext(ItemsContext);

  const getTotalCategorias = () => {
    const categoriasUnicas = items.reduce((acc: string[], item: ItemProps) => {
      if (!acc.includes(item.categoria)) {
        acc.push(item.categoria);
      }
      return acc;
    }, []);

    return categoriasUnicas.length;
  };

  const today = new Date();

  const recentItems = items.filter((item) =>
    isSameWeek(new Date(item.registerDate), today)
  );

  const itemsRunningOut = items.filter((item) => item.quantidade <= 5);

  return (
    <>
      <Typography component="h1" variant="h4" mb={3}>
        Dashboard
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={3} mb={3}>
        <DashboardCard
          subtitle={"Diversidade de Itens"}
          amount={getTotalCategorias()}
        />
        <DashboardCard subtitle={"Inventário Total"} amount={items.length} />
        <DashboardCard
          subtitle={"Itens Recentes"}
          amount={recentItems.length}
        />
        <DashboardCard
          subtitle={"Itens Acabando"}
          amount={itemsRunningOut.length}
        />
      </Box>
      <Box
        flex={1}
        display="flex"
        gap={3}
        flexWrap={matchSm ? "wrap" : "nowrap"}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "var(--gray-700)",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    color: "var(--white)",
                    fontWeight: "700",
                    border: "none",
                  }}
                >
                  Itens Recentes
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "var(--white)",
                    fontWeight: "700",
                    border: "none",
                  }}
                >
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "none", color: "var(--white)" }}
                  >
                    {item.nome}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "none" }}>
                    <DefaultButton
                      variantButton="primary"
                      handleClick={() => navigate(`/estoque/${item.id}`)}
                    >
                      Ver
                    </DefaultButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "var(--gray-700)",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    color: "var(--white)",
                    fontWeight: "700",
                    border: "none",
                  }}
                >
                  Itens Acabando
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "var(--white)",
                    fontWeight: "700",
                    border: "none",
                  }}
                >
                  Qtd.
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "var(--white)",
                    fontWeight: "700",
                    border: "none",
                  }}
                >
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsRunningOut.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "none", color: "var(--white)" }}
                  >
                    {item.nome}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ border: "none", color: "var(--white)" }}
                  >
                    {item.quantidade}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "none" }}>
                    <DefaultButton
                      variantButton="primary"
                      handleClick={() => navigate(`/estoque/${item.id}`)}
                    >
                      Ver
                    </DefaultButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

interface IDashboardCardProps {
  subtitle: string;
  amount: number;
}

function DashboardCard({ subtitle, amount }: IDashboardCardProps) {
  return (
    <>
      <Box
        flex={1}
        height={125}
        px={4}
        py={2}
        borderRadius={1}
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{ backgroundColor: "var(--gray-700)" }}
      >
        <Typography component="span" variant="subtitle2">
          {subtitle}
        </Typography>
        <Typography component="span" alignSelf="center" variant="h3">
          {amount}
        </Typography>
      </Box>
    </>
  );
}
