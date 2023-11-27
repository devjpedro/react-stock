import {
  Box,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import * as zod from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { db } from "../../../db/firebaseConnection";
import { Loading } from "../../components/Loading";
import { ItemProps, ItemsContext } from "../../context/ItemsContext";
import { UserContext } from "../../context/UserContext";

type newItemFormData = zod.infer<typeof newItemFormValidationSchema>;

const newItemFormValidationSchema = zod.object({
  nome: zod.string().min(1, "Nome é obrigatório"),
  quantidade: zod.number().min(1, "Quantidade é obrigatório"),
  preco: zod
    .string()
    .min(0.01, "Preço é obrigatório")
    .transform((value) => Number(value.replace(",", ".")))
    .refine((value) => value > 0, "Insira um valor válido"),
  categoria: zod.string().min(1, "Categoria é obrigatório"),
  descricao: zod.string().min(1, "Este campo é obrigatório"),
});

export default function AdicionarItem() {
  const { items, setItems, matchSm } = useContext(ItemsContext);
  const { setLoading } = useContext(UserContext);
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

  const { register, handleSubmit, reset, formState } = useForm<newItemFormData>(
    {
      resolver: zodResolver(newItemFormValidationSchema),
      defaultValues: {
        nome: "",
        quantidade: 0,
        preco: 0,
        categoria: "",
      },
    }
  );

  const errors = formState.errors;

  async function handleNewItemSubmit(data: newItemFormData) {
    setLoading(true);

    const newItem: ItemProps = {
      id: uuidv4(),
      categoria: data.categoria.toLowerCase(),
      descricao: data.descricao,
      nome: data.nome,
      preco: data.preco,
      quantidade: data.quantidade,
      registerDate: new Date().toISOString(),
    };

    await setDoc(doc(db, "items", `${newItem.id}`), {
      id: newItem.id,
      categoria: newItem.categoria.toLowerCase(),
      descricao: newItem.descricao,
      nome: newItem.nome,
      preco: newItem.preco,
      quantidade: newItem.quantidade,
      registerDate: newItem.registerDate,
    })
      .then(() => {
        setLoading(false);
        toast.success("Item Adicionado!");
        reset();
        setItems([...items, newItem]);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Ocorreu um erro ao adicionar o item");
      });
  }

  return (
    <>
      <Loading />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
        maxWidth={1000}
        mx="auto"
        component="form"
        onSubmit={handleSubmit(handleNewItemSubmit)}
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
                  width: `${matchSm ? "250px" : "auto"}`,
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
                  width: `${matchSm ? "250px" : "auto"}`,
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
                  width: `${matchSm ? "250px" : "auto"}`,
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
                  width: `${matchSm ? "250px" : "auto"}`,
                },
              }}
              error={!!errors.categoria}
              helperText={errors.categoria?.message}
            />
          </Box>
        </Box>
        <Box width="100%" px={matchSm ? 1 : 2}>
          <Typography component="label" htmlFor="descricao">
            Descrição
          </Typography>
          <Textarea {...register("descricao")} minRows={8} id="descricao" />
        </Box>
        <Button
          sx={{
            alignSelf: "start",
            marginLeft: "1rem",
          }}
          variant="contained"
          type="submit"
        >
          Adicionar
        </Button>
      </Box>
    </>
  );
}
