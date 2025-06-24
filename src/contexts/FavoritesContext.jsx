// Importo le funzioni per crare e usare un contesto
import { createContext, useContext, useEffect, useState } from "react";

// Creo il contesto
const FavoritesContext = createContext();

// Creo il Provider che fornisce lo stato della ricerca ai componenti figli
export function FavoritesProvider({ children }) {
  // Creo lo stato per l'aggiunta ai preferiti
  const [favorites, setFavorites] = useState(() => {
    // Recupero i dati dal localStorage, se presenti, al primo render, altrimenti inizializzo con un array vuoto
    const prevState = localStorage.getItem("favorites");
    return prevState ? JSON.parse(prevState) : [];
  });

  // Effetto che salva ogni modifica alla lista preferiti nel localStorage che si attiva solo quando "favorites" cambia
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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
