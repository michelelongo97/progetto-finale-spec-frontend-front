import { BrowserRouter, Routes, Route } from "react-router";

// importazione layouts
import DefaultLayout from "./layouts/DefaultLayout";

// importazione pagine
import HomePage from "./pages/Homepage";
import DestinationPage from "./pages/DestinationPage";
import ComparePage from "./pages/ComparePage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations/:id" element={<DestinationPage />} />
            <Route path="/compare/" element={<ComparePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
