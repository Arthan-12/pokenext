import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import PokemonCard from '../../components/pokemon-card/pokemon-card';
import { Pokemon } from '../../models/pokemon-model';
import styles from '../../styles/Home.module.css';

export default function PokemonDetail() {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  let initialPokemonDetails: Pokemon = null;

  if (typeof window !== 'undefined') {
    initialPokemonDetails = JSON.parse(
      sessionStorage.getItem('pokemonDetails')
    );
  }

  useEffect(() => {
    setPokemonDetails(initialPokemonDetails);
  }, [JSON.stringify(initialPokemonDetails)]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {pokemonDetails ? (
          <PokemonCard
            selected={false}
            onClick={() => 'teste'}
            pokemon={pokemonDetails}
          />
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
