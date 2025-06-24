// Importo le funzioni per crare e usare un contesto
import { createContext, useContext, useState } from "react";

// Creo il contesto
const FavoritesContext = createContext();

// Creo il Provider che fornisce lo stato della ricerca ai componenti figli
export function FavoritesProvider({ children }) {
  // Creo lo stato per l'aggiunta ai preferiti
  const [favorites, setFavorites] = useState([]);

  return (
    // Rendo disponibile gli stati a tutti i componenenti figli del Provider
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Creo custom hook per accedere più facilmente al contesto dei preferiti
export function useFavoritesContext() {
  // Recupero il contesto
  return useContext(FavoritesContext);
}
