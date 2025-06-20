// Importo le funzioni per crare e usare un contesto
import { createContext, useContext, useState } from "react";

// Creo il contesto
const SearchContext = createContext();

// Creo il Provider che fornisce lo stato della ricerca ai componenti figli
export function SearchProvider({ children }) {
  // Creo lo stato per la ricerca
  const [search, setSearch] = useState("");
  // Creo lo stato per il filtro per categoria
  const [category, setCategory] = useState("all");
  // Creo lo stato per l'ordinamento per titolo o categoria
  const [sortBy, setSortBy] = useState("title");
  // Creo lo stato per l'ordinamento per ordine alfabetico ascendente o discendente
  const [sortOrder, setSortOrder] = useState("asc");

  return (
    // Rendo disponibile gli stati a tutti i componenenti figli del Provider
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        category,
        setCategory,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// Creo custom hook per accedere più facilmente al contesto della ricerca
export function useSearchContext() {
  // Recupero il contesto
  return useContext(SearchContext);
}
