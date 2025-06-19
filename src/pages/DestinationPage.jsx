import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { fetchDestinationsById } from "../../api/destinations";

export default function DestinationPage() {
  const { id } = useParams();

  const [destinationPage, setDestinationPage] = useState();

  useEffect(() => {
    fetchDestinationsById(id)
      .then((data) => setDestinationPage(data))
      .catch((error) =>
        console.error("Errore durante il recupero dei dati", error)
      );
  }, [id]);

  console.log(destinationPage);

  return (
    <>
      <h1>Pagina Viaggio</h1>
      <h2>{destinationPage?.destination.title}</h2>
      <h3>{destinationPage?.destination.category}</h3>
      <p>{destinationPage?.destination.country}</p>
      <p>{destinationPage?.destination.continent}</p>
      <p>{destinationPage?.destination.flightHours}</p>
      <p>{destinationPage?.destination.bestSeason}</p>
      <p>{destinationPage?.destination.averageCost}€</p>
      <p>{destinationPage?.destination.rating}</p>
    </>
  );
}
