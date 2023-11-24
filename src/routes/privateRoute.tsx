import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../db/firebaseConnection";
import { UserContext } from "../context/UserContext";

interface PrivateRouteProps {
  children: any;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          setUser(true);
        } else {
          setUser(false);
        }
        setAuthChecked(true);
      });
    };

    checkLogin();
  }, [setUser]);

  if (!authChecked) {
    // A verificação de autenticação ainda está em andamento, renderize algo ou nada
    return null;
  }

  return user ? children : navigate("/login");
}
