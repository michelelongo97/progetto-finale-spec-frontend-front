// Importo la funzione per estrarre l'id dall'URL
import { useParams } from "react-router";

// Importo le funzioni React per la gestione della chiamata API
import { useState, useEffect } from "react";

// Importo la funzione API per ricevere i dati riguardo la singola destinazione
import { fetchDestinationsById } from "../api/destinations";

export default function DestinationPage() {
  // Estraggo l'ID dall'URL
  const { id } = useParams();

  //Memorizzo in uno stato i dettagli della destinazione
  const [destinationPage, setDestinationPage] = useState();

  //Carico i dati ogni volta che cambia l'ID
  useEffect(() => {
    fetchDestinationsById(id)
      .then((data) => setDestinationPage(data))
      .catch((error) =>
        console.error("Errore durante il recupero dei dati", error)
      );
  }, [id]);

  console.log(destinationPage);

  return (
    <>
      <h1>Pagina Viaggio</h1>
      <h2>{destinationPage?.destination.title}</h2>
      <h3>{destinationPage?.destination.category}</h3>
      <p>{destinationPage?.destination.country}</p>
      <p>{destinationPage?.destination.continent}</p>
      <p>{destinationPage?.destination.flightHours}</p>
      <p>{destinationPage?.destination.bestSeason}</p>
      <p>{destinationPage?.destination.averageCost}€</p>
      <p>{destinationPage?.destination.rating}</p>
    </>
  );
}
