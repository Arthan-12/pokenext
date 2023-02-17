import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import PokemonDetailCard from '../../components/pokemon-detail-card/pokemon-detail-card';
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

  const teste = () => {
    console.log('oe oe');
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {pokemonDetails ? (
          <>
            <PokemonDetailCard pokemon={pokemonDetails} />
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
