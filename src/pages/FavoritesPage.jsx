import { Link } from "react-router-dom";
// Importo il custom hook dal contesto
import { useFavoritesContext } from "../contexts/FavoritesContext";

export default function Favorites() {
  const { favorites, setFavorites } = useFavoritesContext();

  //Creo la funzione per la rimozione dell'elemento dai preferiti
  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  return (
    <div className="container">
      <h1 className="mb-4">Preferiti</h1>
      {favorites.length === 0 ? (
        <p className="text-muted">La lista dei preferiti è vuota</p>
      ) : (
        <div className="row g-4">
          {favorites.map((destination) => (
            <div key={destination.id} className="col-md-4">
              <div className="card h-100 shadow-sm">
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
