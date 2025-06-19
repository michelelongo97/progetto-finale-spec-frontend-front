// Importo la funzione Outlet dove verranno renderizzate le pagine
import { Outlet } from "react-router";

// Importo i componenti che saranno utlizzati in tutte le pagine
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
