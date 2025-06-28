// Importo le funzioni React per la gestione della chiamata API
import { useState, useEffect } from "react";

// Importo la funzione per la gestione dei link
import { Link } from "react-router-dom";

// Importo la funzione API per ricevere tutte le destinazioni
import { fetchDestinations, fetchDestinationsById } from "../api/destinations";

// Importo gli hook custom creati nel contesto
import { useSearchContext } from "../contexts/SearchContext";
import { useFavoritesContext } from "../contexts/FavoritesContext";
import { useCompareContext } from "../contexts/CompareContext";

export default function HomePage() {
  //Memorizzo in uno stato le destinazioni
  const [destinations, setDestinations] = useState([]);
  //Memorizzo in uno stato i preferiti importando le variabili dal contesto tramite hook custom
  const { favorites, setFavorites } = useFavoritesContext();
  //Importo dal contesto la funzione da assegnare al bottone confronta destinazioni
  const { addToCompare } = useCompareContext();

  const {
    search,
    category,
    setCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useSearchContext();

  //Recupero le destinazioni al primo render
  useEffect(() => {
    fetchDestinations()
      .then((data) => {
        Promise.all(
          data.map((destination) =>
            fetchDestinationsById(destination.id).then((res) => res.destination)
          )
        )
          .then(setDestinations)
          .catch((error) =>
            console.error("Errore durante il recupero dei dati", error)
          );
      })
      .catch((error) =>
        console.error("Errore durante il recupero dei dati", error)
      );
  }, []);

  // Creo il filtro per la ricerca per titolo
  const filteredDestinations = destinations
    .filter((destination) =>
      destination.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((destination) =>
      category === "all" ? true : destination.category === category
    )
    .sort((a, b) => {
      if (!sortBy) return 0;

      if (sortOrder === "asc") {
        return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
      } else if (sortOrder === "desc") {
        return b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
      }
      return 0;
    });

  //Controllo se l'elemento è presente nei preferiti
  const isFavorite = (id) => favorites.some((favorite) => favorite.id === id);

  // Creo la logica per l'aggiunta e rimozione dai preferiti
  const toggleFavorite = (destination) => {
    if (isFavorite(destination.id)) {
      setFavorites(
        favorites.filter((favorite) => favorite.id !== destination.id)
      );
    } else {
      setFavorites([...favorites, destination]);
    }
  };

  console.log(destinations);

  return (
    <div className="container">
      <h1 className="mb-4">Destinazioni</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          {/* Filtro per categoria*/}
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Tutte le categorie</option>
            <option value="Città">Città</option>
            <option value="Spiaggia">Spiaggia</option>
            <option value="Avventura">Avventura</option>
          </select>
        </div>

        <div className="col-md-4">
          {/* Selezione del campo su cui applicare l'ordinamento */}
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Ordina per</option>
            <option value="title">Titolo</option>
            <option value="category">Categoria</option>
          </select>
        </div>

        <div className="col-md-4">
          {/* Filtro per ordinamento ascendente o discendente*/}
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* Mostro gli elementi filtrati in pagina*/}
      {filteredDestinations.length === 0 ? (
        <p className="text-muted">
          Nessuna destinazione trovata secondo i criteri di ricerca
        </p>
      ) : (
        <div className="row g-4">
          {filteredDestinations.map((destination) => (
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

                  <div className="mt-auto d-flex gap-2">
                    <button
                      className={`btn btn-sm ${
                        isFavorite(destination.id)
                          ? "btn-c-danger"
                          : "btn-c-outline-danger"
                      }`}
                      onClick={() => toggleFavorite(destination)}
                    >
                      {isFavorite(destination.id)
                        ? "Rimuovi dai preferiti"
                        : "Aggiungi ai preferiti"}
                    </button>
                    <button
                      className="btn btn-sm btn-c-outline-primary"
                      onClick={() => addToCompare(destination)}
                    >
                      Confronta
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
