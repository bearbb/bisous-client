import { useContext, createContext } from "react";
export type FavoriteContent = {
  favoriteData: {
    favoriteList: string[];
  };
  setFavoriteData: (data: FavoriteContent["favoriteData"]) => void;
};

export const FavoriteContext = createContext<FavoriteContent>({
  favoriteData: {
    favoriteList: [""],
  },
  setFavoriteData: () => {},
});
export const useFavoriteContext = () => useContext(FavoriteContext);
