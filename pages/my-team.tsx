import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar/navbar';
import DragAndDrop from '../components/drag-and-drop/drag-and-drop';
import { useState, useEffect } from 'react';
import { Pokemon } from '../models/pokemon-model';
import { Button } from 'react-bootstrap';
import PokemonList from '../components/pokemon-list.tsx/pokemon-list';

const initialPokeList: Pokemon[] = [];

export default function MyTeam() {
  const [pokemonCaptureList, setPokemonCaptureList] = useState(initialPokeList);
  const [pokemonSquadTeam, setPokemonSquad] = useState(initialPokeList);
  let pokemonList: Pokemon[] = [];

  if (typeof window !== 'undefined') {
    pokemonList = JSON.parse(sessionStorage.getItem('pokemonList'));
  }

  useEffect(() => {
    setPokemonCaptureList(pokemonList);
    console.log(pokemonCaptureList);
  }, [JSON.stringify(pokemonList)]);

  const clearPokemonList = () => {
    setPokemonCaptureList([]);
    sessionStorage.setItem('pokemonList', null);
  };

  const updatedPokemonList = (filteredPokemonList: Pokemon[]) => {
    setPokemonCaptureList(filteredPokemonList);
  };

  const addPokemonToSquad = (id: number) => {
    const filteredList = pokemonCaptureList.filter(
      (pokemon) => pokemon.id === id
    );
    const pokemonSquadList = [...pokemonSquadTeam, ...filteredList];
    setPokemonSquad(pokemonSquadList);
    console.log(pokemonSquadList);
  };

  const removePokemonFromCaptured = (id: number) => {};

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {!pokemonCaptureList ? (
          <p>Capture pelo menos um Pokémon para começar!</p>
        ) : (
          <>
            <div className={styles.containerAlt}>
              <div className={styles.content}>
                <p>My Captured Pokémon</p>
                <PokemonList
                  pokemonList={pokemonCaptureList}
                  addPokemon={addPokemonToSquad}
                  removePokemon={removePokemonFromCaptured}
                />
              </div>
              <div className={styles.content}>
                <p>My Pokémon Squad!</p>
                {pokemonSquadTeam.length > 0 ? (
                  <>
                    <DragAndDrop
                      key={JSON.stringify(pokemonSquadTeam)}
                      pokemonSquad={pokemonSquadTeam}
                      updatedPokemonList={updatedPokemonList}
                    ></DragAndDrop>
                    <Button variant="danger" onClick={clearPokemonList}>
                      <label style={{ cursor: 'pointer' }}>Clear List</label>
                    </Button>
                  </>
                ) : (
                  <label style={{ cursor: 'pointer' }}>
                    Selecione Pokémons para começar mexer em seu time!
                  </label>
                )}
              </div>
            </div>
          </>
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
