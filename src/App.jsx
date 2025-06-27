import { BrowserRouter, Routes, Route } from "react-router";

// importazione layouts
import DefaultLayout from "./layouts/DefaultLayout";

// importazione pagine
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";
import ComparePage from "./pages/ComparePage";
import FavoritePage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPages";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations/:id" element={<DestinationPage />} />
            <Route path="/compare/" element={<ComparePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
          </Route>
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
