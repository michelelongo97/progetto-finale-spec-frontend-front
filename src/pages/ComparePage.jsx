import { Link } from "react-router-dom";
// Importo le funzioni React per la gestione della chiamata API
import { useState, useEffect } from "react";

// Importo l' hook custom creato nel contesto
import { useCompareContext } from "../contexts/CompareContext";

// Importo la funzione API per ricevere i dati riguardo la singola destinazione
import { fetchDestinationsById } from "../api/destinations";

export default function ComparePage() {
  const { compareList, removeFromCompare } = useCompareContext();
  const [detailedList, setDetailedList] = useState([]);

  useEffect(() => {
    // Recupera i dettagli solo se ci sono destinazioni da confrontare
    if (compareList.length === 0) {
      setDetailedList([]);
      return;
    }

    // Effettua una chiamata per ogni destinazione
    Promise.all(
      compareList.map((destination) =>
        fetchDestinationsById(destination.id).then((res) => res.destination)
      )
    )
      .then(setDetailedList)
      .catch(() => setDetailedList([]));
  }, [compareList]);

  return (
    <>
      <h1>Pagina di comparazione viaggi</h1>
      {detailedList.length === 0 ? (
        <p>Non è presente alcuna destinazione da confrontare</p>
      ) : (
        <ul>
          {detailedList.map((destination) => (
            <li key={destination.id}>
              <Link to={`/destinations/${destination.id}`}>
                <h3>{destination.title}</h3>
              </Link>
              <p>Categoria: {destination.category}</p>
              <p>Paese: {destination.country}</p>
              <p>Continente: {destination.continent}</p>
              <p>Stagione migliore: {destination.bestSeason}</p>
              <p>Costo medio: {destination.averageCost}€</p>
              <p>Ore di volo: {destination.flightHours}</p>
              <p>Valutazione: {destination.rating}⭐</p>
              <button onClick={() => removeFromCompare(destination.id)}>
                Rimuovi dal confronto
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
