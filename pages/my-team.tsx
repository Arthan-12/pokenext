import { Container } from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar/navbar';
import DragAndDrop from '../components/drag-and-drop/drag-and-drop';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { pokemonListState } from '../atoms/pokemon-atom';

export default function MyTeam() {
  const capturedPokemon = useRecoilValue(pokemonListState);

  useEffect(() => {
    getSelectedPokemon();
  });

  const getSelectedPokemon = () => {
    console.log(capturedPokemon);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <p>teste</p>
        {capturedPokemon[0].id ? (
          <DragAndDrop pokemonSquad={capturedPokemon}></DragAndDrop>
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
