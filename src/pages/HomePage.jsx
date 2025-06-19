import { useState, useEffect } from "react";

import { fetchDestinations } from "../../api/destinations";

export default function HomePage() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetchDestinations()
      .then((data) => setDestinations(data))
      .catch((error) =>
        console.error("Errore durante il recupero dei dati", error)
      );
  }, []);

  console.log(destinations);

  return (
    <>
      <h1>Home</h1>
      <ul>
        {destinations.map((destination) => (
          <li key={destination.id}>
            <h3>{destination.title}</h3>
            <p>{destination.category}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
