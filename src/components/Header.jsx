import { Link } from "react-router-dom";
// Importo gli hook custom creati nel contesto
import { useSearchContext } from "../contexts/SearchContext";
import { useFavoritesContext } from "../contexts/FavoritesContext";
import { useCompareContext } from "../contexts/CompareContext";

export default function Header() {
  // Uso il contesto per accedere allo stato di ricerca (search e setSearch
  const { search, setSearch } = useSearchContext();
  const { favorites } = useFavoritesContext();
  const { compareList } = useCompareContext();

  return (
    <header>
      <h2>header</h2>
      <Link to="/">Home</Link>
      <Link to="/favorites">Preferiti ({favorites.length})</Link>
      <Link to="/compare">Compara le destinazioni ({compareList.length})</Link>
      <input
        type="text"
        placeholder="Cerca una destinazione"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </header>
  );
}
