import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../db/firebaseConnection";
import { DefaultButton } from "../../components/DefaultButton";
import { ItemProps, ItemsContext } from "../../context/ItemsContext";

export function Estoque() {
  const navigate = useNavigate();
  const { items, setItems } = useContext(ItemsContext);

  async function handleDeleteItem(itemToDelete: ItemProps) {
    const docRef = doc(db, "items", itemToDelete.id);
    const itemsWithoutItemToDelete = items.filter(
      (item) => item.id !== itemToDelete.id
    );
    const confirmation = confirm("Deseja realmente excluir este item?");
    if (confirmation) {
      await deleteDoc(docRef)
        .then(() => {
          setItems(itemsWithoutItemToDelete);
          toast.success("O item foi removido!");
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: "var(--gray-700)",
          }}
        >
          <TableRow>
            <TableCell
              align="left"
              sx={{
                color: "var(--white)",
                fontWeight: "700",
                border: "none",
              }}
            >
              ID
            </TableCell>

            <TableCell
              align="left"
              sx={{
                color: "var(--white)",
                fontWeight: "700",
                border: "none",
              }}
            >
              Nome
            </TableCell>

            <TableCell
              align="left"
              sx={{
                color: "var(--white)",
                fontWeight: "700",
                border: "none",
              }}
            >
              Em Estoque
            </TableCell>

            <TableCell
              align="left"
              sx={{
                color: "var(--white)",
                fontWeight: "700",
                border: "none",
              }}
            >
              Categoria
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
          {items.map((item: ItemProps) => (
            <TableRow
              key={item.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                align="left"
                sx={{ border: "none", color: "var(--white)" }}
              >
                {item.id}
              </TableCell>
              <TableCell
                align="left"
                sx={{ border: "none", color: "var(--white)" }}
              >
                {item.nome}
              </TableCell>
              <TableCell
                align="left"
                sx={{ border: "none", color: "var(--white)" }}
              >
                {item.quantidade} unid.
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  border: "none",
                  color: "var(--white)",
                  textTransform: "capitalize",
                }}
              >
                {item.categoria}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  border: "none",
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <DefaultButton
                  text="Ver"
                  variantButton="primary"
                  handleClick={() => navigate(`/estoque/${item.id}`)}
                />
                <DefaultButton
                  text="Atualizar"
                  variantButton="success"
                  handleClick={() => navigate(`/estoque/editar/${item.id}`)}
                />
                <DefaultButton
                  text="Excluir"
                  variantButton="error"
                  handleClick={() => handleDeleteItem(item)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
