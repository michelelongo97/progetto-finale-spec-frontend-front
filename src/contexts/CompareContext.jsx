// Importo le funzioni per crare e usare un contesto
import { createContext, useContext, useState } from "react";

// Creo il contesto
const CompareContext = createContext();

// Creo il Provider che fornisce lo stato della ricerca ai componenti figli
export function CompareProvider({ children }) {
  // Creo lo stato per la comparazione
  const [compareList, setCompareList] = useState([]);

  //Creo la funzione per aggiunger la destinazione alla comparazione se non è già presente
  const addToCompare = (destination) => {
    console.log(destination);
    const isAlreadyInList = compareList.some(
      (item) => item.id === destination.id
    );
    if (!isAlreadyInList) {
      setCompareList([...compareList, destination]);
    }
  };

  //Creo la funzione per rimuovere la destinazione
  const removeFromCompare = (id) => {
    const updatedList = compareList.filter((item) => item.id !== id);
    setCompareList(updatedList);
  };

  return (
    // Rendo disponibile gli stati a tutti i componenenti figli del Provider
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

// Creo custom hook per accedere più facilmente al contesto della comparazione
export function useCompareContext() {
  // Recupero il contesto
  return useContext(CompareContext);
}
