import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="bg-c-light">
      <div
        className="container d-flex flex-column justify-content-center align-items-center text-center "
        style={{ minHeight: "100vh" }}
      >
        <h1 className="display-4 text-c-primary mb-3">404</h1>
        <h2 className="mb-3">Pagina non trovata</h2>
        <p className="text-muted mb-4">
          La pagina che stai cercando non esiste o è stata rimossa.
        </p>
        <Link to="/" className="btn btn-c-primary">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
