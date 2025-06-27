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
    <div className="container">
      <h1 className="mb-4">Pagina di comparazione viaggi</h1>
      {detailedList.length === 0 ? (
        <p className="text-muted">
          Non è presente alcuna destinazione da confrontare
        </p>
      ) : (
        <div className="row g-4">
          {detailedList.map((destination) => (
            <div key={destination.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                {destination.image && (
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <Link
                      to={`/destinations/${destination.id}`}
                      className="text-decoration-none text-c-primary"
                    >
                      {destination.title}
                    </Link>
                  </h5>
                  <ul className="list-unstyled text-muted small mb-3">
                    <li>
                      <strong>Categoria:</strong> {destination.category}
                    </li>
                    <li>
                      <strong>Paese:</strong> {destination.country}
                    </li>
                    <li>
                      <strong>Continente:</strong> {destination.continent}
                    </li>
                    <li>
                      <strong>Stagione migliore:</strong>{" "}
                      {destination.bestSeason}
                    </li>
                    <li>
                      <strong>Costo medio:</strong> {destination.averageCost}€
                    </li>
                    <li>
                      <strong>Ore di volo:</strong> {destination.flightHours}
                    </li>
                    <li>
                      <strong>Valutazione:</strong> {destination.rating}⭐
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <button
                      className="btn btn-sm btn-c-outline-danger"
                      onClick={() => removeFromCompare(destination.id)}
                    >
                      Rimuovi dal confronto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
