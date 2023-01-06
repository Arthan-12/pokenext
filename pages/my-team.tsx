import { Container } from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar/navbar';
import DragAndDrop from '../components/drag-and-drop/drag-and-drop';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { pokemonListState } from '../atoms/pokemon-atom';
import { Pokemon } from '../models/pokemon-model';
import PokemonContext from '../contexts/pokemon-context';

const initialPokeList: Pokemon[] = [];

export default function MyTeam() {
  const [pokemonCaptureList, setPokemonCaptureList] = useState(initialPokeList);

  useEffect(() => {
    // getSelectedPokemon();
    // const capturedPokemon = JSON.parse(
    //   sessionStorage.getItem('pokemonCapturedList')!
    // ) as Pokemon[];
    // console.log(capturedPokemon);
    // return () => {
    //   setPokemonCaptureList(capturedPokemon), [pokemonCaptureList];
    // };
    teste();
  });

  const teste = () => {};

  const getSelectedPokemon = () => {
    const capturedPokemon = JSON.parse(
      sessionStorage.getItem('pokemonCapturedList')!
    ) as Pokemon[];
    console.log(capturedPokemon);
    return setPokemonCaptureList(capturedPokemon);
  };

  return (
    <>
      <PokemonContext.Consumer>
        {(searchedPokemon) =>
          searchedPokemon && <div>{searchedPokemon.name}</div>
        }
      </PokemonContext.Consumer>
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
