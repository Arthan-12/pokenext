import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import PokemonDetailCard from '../../components/pokemon-detail-card/pokemon-detail-card';
import { Pokemon } from '../../models/pokemon-model';
import styles from '../../styles/Pages.module.css';

export default function PokemonDetail() {
  // HOOK ZONE
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [routeId, setRouteId] = useState(null);
  const route = useRouter();
  let initialPokemonDetails: Pokemon = null;

  // PAGE INIT ZONE

  if (typeof window !== 'undefined') {
    initialPokemonDetails = JSON.parse(
      sessionStorage.getItem('pokemonDetails')
    );
  }

  useEffect(() => {
    setPokemonDetails(initialPokemonDetails);
    getPokemonId(initialPokemonDetails);
  }, [JSON.stringify(initialPokemonDetails)]);

  // FUNCTIONS ZONE

  const getPokemonId = (initialPokemonDetails) => {
    if (route.query.id) {
      const stringRouteId = route.query.id.toString().split('=');
      setRouteId(stringRouteId[1]);
    }
  };

  const checkRouteId = () => {
    if (routeId === pokemonDetails.id.toString()) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {pokemonDetails && checkRouteId() ? (
          <>
            <PokemonDetailCard pokemon={pokemonDetails} />
          </>
        ) : (
          <>
            <p>There's nothing here</p>
          </>
        )}
      </main>
    </>
  );
}
