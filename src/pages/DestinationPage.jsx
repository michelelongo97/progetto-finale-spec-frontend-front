// Importo la funzione per estrarre l'id dall'URL
import { useParams, useNavigate } from "react-router";

// Importo le funzioni React per la gestione della chiamata API
import { useState, useEffect } from "react";

// Importo la funzione API per ricevere i dati riguardo la singola destinazione
import { fetchDestinationsById } from "../api/destinations";

// Importo gli hook custom dai contesti
import { useFavoritesContext } from "../contexts/FavoritesContext";
import { useCompareContext } from "../contexts/CompareContext";

export default function DestinationPage() {
  // Estraggo l'ID dall'URL
  const { id } = useParams();

  const navigate = useNavigate();

  const { favorites, setFavorites } = useFavoritesContext();
  const { addToCompare } = useCompareContext();

  //Controllo se l'elemento è presente nei preferiti
  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  // Creo la logica per l'aggiunta e rimozione dai preferiti
  const toggleFavorite = (destination) => {
    if (isFavorite(destination.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== destination.id));
    } else {
      setFavorites([...favorites, destination]);
    }
  };

  //Memorizzo in uno stato i dettagli della destinazione
  const [destinationPage, setDestinationPage] = useState();

  //Carico i dati ogni volta che cambia l'ID
  useEffect(() => {
    fetchDestinationsById(id)
      .then((data) => {
        if (!data.destination) {
          // Se non c'è una destinazione valida reindirizzo al 404
          navigate("/not-found");
        } else {
          setDestinationPage(data);
        }
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei dati", error);
        // In caso di errore reindirizzo ugualmente alla 404
        navigate("/not-found");
      });
  }, [id, navigate]);

  console.log(destinationPage);

  return (
    <div className="container">
      {destinationPage && (
        <div className="card shadow mb-4">
          <div className="card-header bg-c-primary text-white">
            <h2 className="mb-0">{destinationPage?.destination.title}</h2>
            <small className="text-white-50">
              {destinationPage?.destination.category}
            </small>
          </div>
          <div className="card-body">
            {destinationPage?.destination.image && (
              <img
                src={destinationPage.destination.image}
                alt={destinationPage.destination.title}
                className="img-fluid mb-4 rounded"
                style={{
                  objectFit: "cover",
                  maxHeight: "400px",
                  width: "100%",
                }}
              />
            )}

            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Paese:</strong> {destinationPage?.destination.country}
              </li>
              <li className="list-group-item">
                <strong>Continente:</strong>{" "}
                {destinationPage?.destination.continent}
              </li>
              <li className="list-group-item">
                <strong>Ore di volo:</strong>{" "}
                {destinationPage?.destination.flightHours} ore
              </li>
              <li className="list-group-item">
                <strong>Stagione migliore:</strong>{" "}
                {destinationPage?.destination.bestSeason}
              </li>
              <li className="list-group-item">
                <strong>Costo medio:</strong>{" "}
                {destinationPage?.destination.averageCost}€
              </li>
              <li className="list-group-item">
                <strong>Valutazione:</strong>{" "}
                {destinationPage?.destination.rating} ⭐
              </li>
            </ul>
          </div>
          <div className="card-footer d-flex flex-wrap gap-2">
            <button
              className={`btn flex-fill ${
                isFavorite(destinationPage.destination.id)
                  ? "btn-c-danger"
                  : "btn-c-outline-danger"
              }`}
              onClick={() => toggleFavorite(destinationPage.destination)}
            >
              {isFavorite(destinationPage.destination.id)
                ? "Rimuovi dai preferiti"
                : "Aggiungi ai preferiti"}
            </button>

            <button
              className="btn btn-c-outline-primary flex-fill"
              onClick={() => addToCompare(destinationPage.destination)}
            >
              <i className="bi bi-plus-square"></i> Aggiungi al confronto
            </button>

            <button
              className="btn btn-c-secondary flex-fill"
              onClick={() => navigate(-1)}
            >
              &larr; Torna indietro
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
