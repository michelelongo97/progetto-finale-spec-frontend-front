// Importo Outlet per visualizzare le pagine secondo le route e i componenti condivisi
import { Outlet } from "react-router";

// Importo i componenti che saranno utlizzati in tutte le pagine
import Header from "../components/Header";
import Footer from "../components/Footer";

// Importo il provider dal contesto
import { SearchProvider } from "../contexts/SearchContext";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { CompareProvider } from "../contexts/CompareContext";

export default function DefaultLayout() {
  return (
    <SearchProvider>
      <FavoritesProvider>
        <CompareProvider>
          <div className="d-flex flex-column min-vh-100 bg-c-light">
            <Header />
            <main className="container flex-grow-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </CompareProvider>
      </FavoritesProvider>
    </SearchProvider>
  );
}
