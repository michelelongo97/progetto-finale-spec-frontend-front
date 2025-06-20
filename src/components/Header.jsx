// Importo l'hook custom creato nel contesto
import { useSearchContext } from "../contexts/SearchContext";

export default function Header() {
  // Uso il contesto per accedere allo stato di ricerca (search e setSearch
  const { search, setSearch } = useSearchContext();

  return (
    <header>
      <h2>header</h2>
      <input
        type="text"
        placeholder="Cerca una destinazione"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </header>
  );
}
