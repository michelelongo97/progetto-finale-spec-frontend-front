// Importo le funzioni per crare e usare un contesto
import { createContext, useContext, useState } from "react";

// Creo il contesto
const SearchContext = createContext();

// Creo il Provider che fornisce lo stato della ricerca ai componenti figli
export function SearchProvider({ children }) {
  // Creo lo stato per la ricerca
  const [search, setSearch] = useState("");

  return (
    // Rendo disponibile lo stato a tutti i componenenti figli del Provider
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

// Creo custom hook per accedere più facilmente al contesto della ricerca
export function useSearchContext() {
  // Recupero il contesto
  return useContext(SearchContext);
}
