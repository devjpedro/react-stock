import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as zod from "zod";
import { auth } from "../../../db/firebaseConnection";
import { Loading } from "../../components/Loading";
import { ItemsContext } from "../../context/ItemsContext";
import { UserContext } from "../../context/UserContext";

const loginFormValidationSchema = zod.object({
  email: zod.string().email("Email é obrigatório"),
});

type loginFormData = zod.infer<typeof loginFormValidationSchema>;

export function RecuperarSenha() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm<loginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: "",
    },
  });

  const { matchSm } = useContext(ItemsContext);
  const { setLoading } = useContext(UserContext);

  const errors = formState.errors;

  async function recoverPassword(data: loginFormData) {
    setLoading(true);
    await sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setLoading(false);
        toast.success("Email enviado com sucesso");
        reset();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <>
      <Loading />
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
            Recuperar Senha
          </Typography>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            textAlign="start"
            onSubmit={handleSubmit(recoverPassword)}
          >
            <TextField
              id="email"
              variant="outlined"
              placeholder="Digite seu e-mail"
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
            <Button type="submit" variant="contained">
              Recuperar
            </Button>
          </Box>
          <Typography
            mt={3}
            color="#a6a6a6"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
            variant="subtitle2"
          >
            Voltar
          </Typography>
        </Box>
      </Box>
    </>
  );
}
