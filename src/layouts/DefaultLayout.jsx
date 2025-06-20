// Importo Outlet per visualizzare le pagine secondo le route e i componenti condivisi
import { Outlet } from "react-router";

// Importo i componenti che saranno utlizzati in tutte le pagine
import Header from "../components/Header";
import Footer from "../components/Footer";

// Importo il provider dal contesto
import { SearchProvider } from "../contexts/SearchContext";

export default function DefaultLayout() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </SearchProvider>
  );
}
