// Importo le funzioni React per la gestione della chiamata API
import { useState, useEffect } from "react";

// Importo la funzione per la gestione dei link
import { Link } from "react-router";

// Importo la funzione API per ricevere tutte le destinazioni
import { fetchDestinations } from "../api/destinations";

// Importo l'hook custom creato nel contesto
import { useSearchContext } from "../contexts/SearchContext";

export default function HomePage() {
  //Memorizzo in uno stato le destinazioni
  const [destinations, setDestinations] = useState([]);

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
      .then((data) => setDestinations(data))
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

  console.log(destinations);

  return (
    <>
      <h1>Home</h1>

      {/* Filtro per categoria*/}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">Tutte le categorie</option>
        <option value="Città">Città</option>
        <option value="Spiaggia">Spiaggia</option>
        <option value="Avventura">Avventura</option>
      </select>

      {/* Selezione del campo su cui applicare l'ordinamento */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Ordina per</option>
        <option value="title">Titolo</option>
        <option value="category">Categoria</option>
      </select>

      {/* Filtro per ordinamento ascendente o discendente*/}
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      {/* Mostro gli elementi filtrati in pagina*/}
      <ul>
        {filteredDestinations.length === 0 ? (
          <p>Nessuna destinazione trovata secondo i criteri di ricerca</p>
        ) : (
          filteredDestinations.map((destination) => (
            <li key={destination.id}>
              <Link to={`/destinations/${destination.id}`}>
                <h3>{destination.title}</h3>
              </Link>
              <p>{destination.category}</p>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
