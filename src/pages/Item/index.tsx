import { Box, Typography, styled } from "@mui/material";
import { format } from "date-fns";
import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../db/firebaseConnection";
import { DefaultButton } from "../../components/DefaultButton";
import { ItemProps, ItemsContext } from "../../context/ItemsContext";

const CustomizedCard = styled(Box)`
  background-color: var(--gray-700);
  padding: 1rem;
  border-radius: 4px;
`;

export function Item() {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const { matchSm, items, setItems } = useContext(ItemsContext);

  const itemActive = items.find((i) => i.id === itemId);

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

  if (!itemActive) {
    return <h2>Oops... Esse item não foi encontrado =(</h2>;
  }

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={matchSm ? "column" : "row"}
        gap={matchSm ? 2 : 4}
        alignItems="center"
        mb={5}
      >
        <Typography variant="h4">{itemActive.nome}</Typography>

        <Box display="flex" gap={1.5} alignItems="center">
          <DefaultButton
            text="Atualizar"
            variantButton="primary"
            handleClick={() => navigate(`/estoque/editar/${itemActive.id}`)}
          />
          <DefaultButton
            text="Excluir"
            variantButton="error"
            handleClick={() => handleDeleteItem(itemActive)}
          />
          <DefaultButton
            variantButton="success"
            text="Voltar"
            handleClick={() => navigate("/estoque")}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={matchSm ? 1 : 3}
        mb={matchSm ? 3 : 5}
      >
        <CustomizedCard>
          <Typography>Categoria: {itemActive.categoria}</Typography>
        </CustomizedCard>
        <CustomizedCard>
          <Typography>
            Quantidade em estoque: {itemActive.quantidade}
          </Typography>
        </CustomizedCard>
        <CustomizedCard>
          <Typography>Preço: R$ {itemActive.preco}</Typography>
        </CustomizedCard>
      </Box>
      <Typography variant="h5" mb={1}>
        Descrição:
      </Typography>
      <Typography borderBottom="1px solid #dadada" pb={2}>
        {itemActive.descricao}
      </Typography>
      <Box display="flex" gap={3} mt={2}>
        <Typography>
          Cadastrado em:{" "}
          {itemActive.registerDate
            ? format(new Date(itemActive.registerDate), "dd/MM/yyyy")
            : "Data de cadastro indisponível"}
        </Typography>
        {itemActive.updatedDate && (
          <Typography>
            Atualizado em:{" "}
            {format(new Date(itemActive.registerDate), "dd/MM/yyyy")}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
