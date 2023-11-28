import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as zod from "zod";
import { auth } from "../../../db/firebaseConnection";
import { Loading } from "../../components/Loading";
import { ItemsContext } from "../../context/ItemsContext";
import { UserContext } from "../../context/UserContext";

const loginFormValidationSchema = zod.object({
  email: zod.string().email("Email é obrigatório"),
  senha: zod.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type loginFormData = zod.infer<typeof loginFormValidationSchema>;

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setUser, setLoading } = useContext(UserContext);
  const { matchSm } = useContext(ItemsContext);

  const { register, handleSubmit, formState, reset } = useForm<loginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const errors = formState.errors;

  async function handleSubmitLogin(data: loginFormData) {
    setLoading(true);
    await signInWithEmailAndPassword(auth, data.email, data.senha)
      .then(() => {
        setLoading(false);
        toast.success("Usuário logado com sucesso!");
        reset();
      })
      .catch((error) => {
        if (error.code === "auth/invalid-login-credentials") {
          setLoading(false);
          toast.error("Usuário ou senha incorretos");
          return;
        }
        toast.error("Ocorreu um erro");
        reset();
      });
  }

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(true);
          navigate("/");
        } else {
        }
      });
    }

    checkLogin();
  }, [handleSubmitLogin]);

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
            Acessar sua conta
          </Typography>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            textAlign="start"
            onSubmit={handleSubmit(handleSubmitLogin)}
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
              type={showPassword ? "text" : "password"}
              error={!!errors.senha}
              helperText={errors.senha?.message}
              {...register("senha")}
              InputProps={{
                sx: {
                  color: "#000",
                  background: "var(--white)",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Link to="/recuperar-senha">
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#d6d6d6",
                  cursor: "pointer",
                  textDecorationStyle: "solid",
                }}
              >
                Esqueceu a senha?
              </Typography>
            </Link>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
          <Typography mt={3}>
            Ainda não tem uma conta?{" "}
            <Typography
              component="span"
              color="var(--purple-500)"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/registrar")}
            >
              Crie agora!
            </Typography>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
