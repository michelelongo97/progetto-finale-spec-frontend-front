import { Link } from "react-router-dom";
// Importo le funzioni React per la gestione della chiamata API
import { useState, useEffect } from "react";
// Importo il custom hook dal contesto
import { useFavoritesContext } from "../contexts/FavoritesContext";

// Importo la funzione API per ricevere i dati riguardo la singola destinazione
import { fetchDestinationsById } from "../api/destinations";

export default function Favorites() {
  const { favorites, setFavorites } = useFavoritesContext();
  const [detailedFavorites, setDetailedFavorites] = useState([]);

  useEffect(() => {
    // Recupera i dettagli solo se ci sono destinazioni da confrontare
    if (favorites.length === 0) {
      setDetailedFavorites([]);
      return;
    }

    // Effettua una chiamata per ogni destinazione
    Promise.all(
      favorites.map((destination) =>
        fetchDestinationsById(destination.id).then((res) => res.destination)
      )
    )
      .then(setDetailedFavorites)
      .catch(() => setDetailedFavorites([]));
  }, [favorites]);

  //Creo la funzione per la rimozione dell'elemento dai preferiti
  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  return (
    <div className="container">
      <h1 className="mb-4">Preferiti</h1>
      {detailedFavorites.length === 0 ? (
        <p className="text-muted">La lista dei preferiti è vuota</p>
      ) : (
        <div className="row g-4">
          {detailedFavorites.map((destination) => (
            <div key={destination.id} className="col-md-4">
              <div className="card h-100 shadow-sm">
                {destination.image && (
                  <img
                    src={destination.image}
                    className="card-img-top"
                    alt={destination.title}
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

                  <p className="card-text text-muted">{destination.category}</p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-sm btn-c-danger"
                      onClick={() => removeFromFavorites(destination.id)}
                    >
                      Rimuovi dai preferiti
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
