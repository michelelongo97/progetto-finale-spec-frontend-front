// Assegno ad una costante il link per la chiamata API importatto dal file ENV
const BASE_URL = import.meta.env.VITE_API_URL;

// Funzione per recuperare i dati per tutte le destinazioni
export async function fetchDestinations() {
  const res = await fetch(`${BASE_URL}/destinations`);
  if (!res.ok) throw new Error("Errore durante il recupero delle destinazioni");
  return res.json();
}

// Funzione per recuperare i dati di una singola destinazione in base all'ID
export async function fetchDestinationsById(id) {
  const res = await fetch(`${BASE_URL}/destinations/${id}`);
  if (!res.ok) throw new Error("Errore: destinazione non trovata");
  return res.json();
}
