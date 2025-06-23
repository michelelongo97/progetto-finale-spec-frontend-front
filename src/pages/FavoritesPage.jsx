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
    <>
      <h1>Preferiti</h1>
      {favorites.length === 0 ? (
        <p>La lista dei preferiti è vuota</p>
      ) : (
        <ul>
          {favorites.map((destination) => (
            <li key={destination.id}>
              <Link to={`/destinations/${destination.id}`}>
                {destination.title}
              </Link>
              <p>{destination.category}</p>
              <button onClick={() => removeFromFavorites(destination.id)}>
                Rimuovi dai preferiti
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
