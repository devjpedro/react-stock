import {
  Box,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import * as zod from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../db/firebaseConnection";
import { DefaultButton } from "../../components/DefaultButton";
import { ItemProps, ItemsContext } from "../../context/ItemsContext";

const editItemFormValidationSchema = zod.object({
  nome: zod.string().min(1, "Nome é obrigatório"),
  quantidade: zod.number().min(1, "Quantidade é obrigatório"),
  preco: zod
    .string()
    .min(0.01, "Preço é obrigatório")
    .transform((value) => Number(value))
    .refine((value) => value > 0, "Insira um valor válido"),
  categoria: zod.string().min(1, "Categoria é obrigatório"),
  descricao: zod.string().min(1, "Este campo é obrigatório"),
});

type editItemFormData = zod.infer<typeof editItemFormValidationSchema>;

export default function EditarItem() {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const { items, setItems } = useContext(ItemsContext);

  const itemActive = items.find((i) => i.id === itemId);
  const itemActiveId = itemActive?.id;

  const Textarea = styled(TextareaAutosize)`
    width: 100%;

    margin-top: 0.5rem;
    padding: 1rem;

    resize: none;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;

    background-color: var(--gray-700);
    color: var(--white);
  `;

  const { register, handleSubmit, formState } = useForm<editItemFormData>({
    resolver: zodResolver(editItemFormValidationSchema),
    defaultValues: {
      nome: itemActive?.nome,
      quantidade: itemActive?.quantidade,
      preco: Number(itemActive?.preco) ?? 0,
      categoria: itemActive?.categoria,
      descricao: itemActive?.descricao,
    },
  });

  const errors = formState.errors;

  async function handleEditItemSubmit(data: editItemFormData) {
    setItems((state: ItemProps[]) =>
      state.map((item: ItemProps) => {
        if (item.id === itemActive?.id) {
          return {
            ...item,
            nome: data.nome,
            quantidade: data.quantidade,
            preco: data.preco,
            categoria: data.categoria.toLowerCase(),
            descricao: data.descricao,
            updatedDate: new Date().toISOString(),
          };
        } else {
          return item;
        }
      })
    );

    if (itemActiveId) {
      const docRef = doc(db, "items", itemActive?.id);
      await updateDoc(docRef, {
        categoria: data.categoria,
        descricao: data.descricao,
        nome: data.nome,
        preco: data.preco,
        quantidade: data.quantidade,
        updatedDate: new Date(),
      })
        .then(() => {
          toast.success("Item atualizado!");
        })
        .catch((error) => console.log(error));
      navigate(`/estoque/${itemActive?.id}`);
    }
  }

  if (!itemActive) {
    return <h2>Oops... Esse item não foi encontrado =(</h2>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={3}
      maxWidth={1000}
      mx="auto"
      component="form"
      onSubmit={handleSubmit(handleEditItemSubmit)}
    >
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
        <Box display="flex" flexDirection="column">
          <Typography mb={1} component="label" htmlFor="nome">
            Nome
          </Typography>
          <TextField
            {...register("nome")}
            id="nome"
            variant="outlined"
            InputProps={{
              sx: {
                color: "#fff",
                background: "var(--gray-700)",
              },
            }}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography mb={1} component="label" htmlFor="quantidade">
            Quantidade
          </Typography>
          <TextField
            {...register("quantidade", {
              valueAsNumber: true,
            })}
            type="number"
            id="quantidade"
            variant="outlined"
            InputProps={{
              sx: {
                color: "#fff",
                background: "var(--gray-700)",
              },
            }}
            error={!!errors.quantidade}
            helperText={errors.quantidade?.message}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography mb={1} component="label" htmlFor="preco">
            Preço
          </Typography>
          <TextField
            {...register("preco")}
            id="preco"
            variant="outlined"
            InputProps={{
              sx: {
                color: "#fff",
                background: "var(--gray-700)",
              },
            }}
            error={!!errors.preco}
            helperText={errors.preco?.message}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography mb={1} component="label" htmlFor="categoria">
            Categoria
          </Typography>
          <TextField
            {...register("categoria")}
            id="categoria"
            variant="outlined"
            InputProps={{
              sx: {
                color: "#fff",
                background: "var(--gray-700)",
              },
            }}
            error={!!errors.categoria}
            helperText={errors.categoria?.message}
          />
        </Box>
      </Box>
      <Box width="100%" px={2}>
        <Typography component="label" htmlFor="descricao">
          Descrição
        </Typography>
        <Textarea {...register("descricao")} minRows={8} id="descricao" />
      </Box>
      <Box alignSelf="start" ml="1rem" display="flex" gap={2}>
        <DefaultButton type="submit" text="Salvar" />
        <DefaultButton
          variantButton="success"
          text="Voltar"
          handleClick={() => navigate(-1)}
        />
      </Box>
    </Box>
  );
}
