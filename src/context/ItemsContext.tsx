import { useMediaQuery, useTheme } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../../db/firebaseConnection";

interface ItemsContextProps {
  items: ItemProps[];
  setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
  matchSm: boolean;
}

export const ItemsContext = createContext({} as ItemsContextProps);

export interface ItemProps {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  quantidade: number;
  preco: number | string;
  registerDate: Date | string;
  updatedDate?: Date | string;
}

interface IItemsContextProviderProps {
  children: React.ReactNode;
}

export function ItemsContextProvider({ children }: IItemsContextProviderProps) {
  const [items, setItems] = useState<ItemProps[]>([]);

  const theme = useTheme();

  const matchSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    async function searchItems() {
      const itemsRef = collection(db, "items");

      await getDocs(itemsRef)
        .then((snapshot) => {
          let listItems: ItemProps[] = [];

          snapshot.forEach((doc) => {
            listItems.push({
              id: doc.id,
              categoria: doc.data().categoria,
              descricao: doc.data().descricao,
              nome: doc.data().nome,
              preco: doc.data().preco,
              quantidade: doc.data().quantidade,
              registerDate: new Date(doc.data().registerDate),
            });
          });

          setItems(listItems);
        })
        .catch((error) => console.log(error));
    }
    searchItems();
  }, []);

  return (
    <ItemsContext.Provider value={{ items, setItems, matchSm }}>
      {children}
    </ItemsContext.Provider>
  );
}
