// Importo le funzioni React per la gestione della chiamata API
import { useState, useEffect } from "react";

// Importo la funzione per la gestione dei link
import { Link } from "react-router";

// Importo la funzione API per ricevere tutte le destinazioni
import { fetchDestinations } from "../api/destinations";

export default function HomePage() {
  //Memorizzo in uno stato le destinazioni
  const [destinations, setDestinations] = useState([]);

  //Recupero le destinazioni al primo render
  useEffect(() => {
    fetchDestinations()
      .then((data) => setDestinations(data))
      .catch((error) =>
        console.error("Errore durante il recupero dei dati", error)
      );
  }, []);

  console.log(destinations);

  return (
    <>
      <h1>Home</h1>
      <ul>
        {destinations.map((destination) => (
          <li key={destination.id}>
            <Link to={`/destinations/${destination.id}`}>
              <h3>{destination.title}</h3>
            </Link>
            <p>{destination.category}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
