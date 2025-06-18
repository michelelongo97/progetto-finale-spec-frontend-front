import { BrowserRouter, Routes, Route } from "react-router";

// importazione layouts
import DefaultLayout from "./layouts/DefaultLayout";

// importazione pagine
import HomePage from "./pages/Homepage";
import DestinationPage from "./pages/DestinationPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations/:id" element={<DestinationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
