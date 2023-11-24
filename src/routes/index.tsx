import { Route, Routes } from "react-router-dom";
import { DefaultItemsLayout } from "../layout/DefaultItemsLayout";
import { DefaultLayout } from "../layout/DefaultLayout";
import AdicionarItem from "../pages/AdicionarItem";
import EditarItem from "../pages/EditarItem";
import { Estoque } from "../pages/Estoque";
import { Home } from "../pages/Home";
import { Item } from "../pages/Item";
import { Login } from "../pages/Login";
import { RecuperarSenha } from "../pages/RecuperarSenhar";
import { Register } from "../pages/Register";
import { PrivateRoute } from "./privateRoute";

export default function RoutesApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DefaultLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/estoque" element={<DefaultItemsLayout />}>
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/estoque/:itemId" element={<Item />} />
          <Route path="/estoque/adicionar-item" element={<AdicionarItem />} />
          <Route path="/estoque/editar/:itemId" element={<EditarItem />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Register />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
    </Routes>
  );
}
