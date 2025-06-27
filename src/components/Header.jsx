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
      <nav className="navbar navbar-expand-lg navbar-dark bg-c-primary mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            HomePage
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to="/favorites"
                >
                  <div className="position-relative">
                    <i className="bi bi-heart-fill fs-5"></i>
                    {favorites.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {favorites.length}
                      </span>
                    )}
                  </div>
                  Preferiti
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to="/compare"
                >
                  <div className="position-relative">
                    <i className="bi bi-columns-gap fs-5"></i>
                    {compareList.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {compareList.length}
                      </span>
                    )}
                  </div>
                  Confronta
                </Link>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Cerca una destinazione"
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
