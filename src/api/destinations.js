const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchDestinations() {
  const res = await fetch(`${BASE_URL}/destinations`);
  if (!res.ok) throw new Error("Errore durante il recupero delle destinazioni");
  return res.json();
}

export async function fetchDestinationsById(id) {
  const res = await fetch(`${BASE_URL}/destinations/${id}`);
  if (!res.ok) throw new Error("Errore: destinazione non trovata");
  return res.json();
}
