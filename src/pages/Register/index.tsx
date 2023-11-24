import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as zod from "zod";
import { auth } from "../../../db/firebaseConnection";
import { ItemsContext } from "../../context/ItemsContext";

const loginFormValidationSchema = zod.object({
  email: zod.string().email("Email é obrigatório"),
  senha: zod.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type loginFormData = zod.infer<typeof loginFormValidationSchema>;

export function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm<loginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const { matchSm } = useContext(ItemsContext);

  const errors = formState.errors;

  async function handleSubmitRegister(data: loginFormData) {
    await createUserWithEmailAndPassword(auth, data.email, data.senha)
      .then(() => {
        toast.success("Cadastrado com sucesso!");
        reset();
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Senha muito fraca.");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Email já existe!");
        }
      });
  }

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Box
        width={matchSm ? 300 : 500}
        p={matchSm ? 3 : 5}
        sx={{ background: "var(--gray-700)" }}
        borderRadius={2}
      >
        <Typography
          textTransform="uppercase"
          fontWeight="900"
          variant="h5"
          color={"var(--purple-500)"}
          mb={5}
        >
          React Stock
        </Typography>
        <Typography variant="h5" mb={3}>
          Crie sua conta
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSubmitRegister)}
          display="flex"
          flexDirection="column"
          gap={2}
          textAlign="start"
        >
          <TextField
            id="email"
            variant="outlined"
            placeholder="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            InputProps={{
              sx: {
                color: "#000",
                background: "var(--white)",
              },
            }}
          />
          <TextField
            id="senha"
            variant="outlined"
            placeholder="Senha"
            type="password"
            error={!!errors.senha}
            helperText={errors.senha?.message}
            {...register("senha")}
            InputProps={{
              sx: {
                color: "#000",
                background: "var(--white)",
              },
            }}
          />
          <Button type="submit" variant="contained">
            Cadastrar
          </Button>
        </Box>
        <Typography mt={3}>
          Já possui uma conta?{" "}
          <Typography
            component="span"
            color="var(--purple-500)"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Entre agora!
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
