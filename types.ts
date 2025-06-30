export type Destination = {
  title: string; // Nome della destinazione (es. Tokyo)
  category: string; // Tipo: "Città", "Spiaggia", "Avventura", ecc.
  country: string; // Paese (es. Giappone)
  continent: string; // Continente (es. Asia)
  bestSeason: string; // Periodo ideale (es. Primavera)
  averageCost: number; // Costo medio per il viaggio in euro
  flightHours: number; // Ore di volo
  rating: number; // Punteggio da 1 a 5
  image: string; // Link immagine
};
