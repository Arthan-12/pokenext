import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar/navbar';
import DragAndDrop from '../components/drag-and-drop/drag-and-drop';
import { useState, useEffect } from 'react';
import { Pokemon } from '../models/pokemon-model';

const initialPokeList: Pokemon[] = [];

export default function MyTeam() {
  const [pokemonCaptureList, setPokemonCaptureList] = useState(initialPokeList);
  const pokemonList = JSON.parse(sessionStorage.getItem('pokemonList'));

  useEffect(() => {
    setPokemonCaptureList(pokemonList);
  }, [JSON.stringify(pokemonList)]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <p>teste</p>
        {pokemonCaptureList.length > 0 ? (
          <DragAndDrop pokemonSquad={pokemonCaptureList}></DragAndDrop>
        ) : (
          <p>Selecione Pokémons para começar mexer em seu time!</p>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {'Victor'}
        </a>
      </footer>
    </>
  );
}
