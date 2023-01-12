import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar/navbar';
import DragAndDrop from '../components/drag-and-drop/drag-and-drop';
import { useState, useEffect } from 'react';
import { Pokemon } from '../models/pokemon-model';
import { Button } from 'react-bootstrap';
import PokemonList from '../components/pokemon-list.tsx/pokemon-list';
import InfoDialog from '../components/info-dialog/info-dialog';
import { Dropzone } from '../components/multiple-drag-and-drop/dropzone/dropzone';

const initialPokeList: Pokemon[] = [];

export default function MyTeam() {
  const [pokemonCapturedList, setPokemonCapturedList] =
    useState(initialPokeList);
  const [pokemonSquadTeam, setPokemonSquad] = useState(initialPokeList);
  let pokemonList: Pokemon[] = [];

  if (typeof window !== 'undefined') {
    pokemonList = JSON.parse(sessionStorage.getItem('pokemonList'));
  }

  useEffect(() => {
    setPokemonCapturedList(pokemonList);
  }, [JSON.stringify(pokemonList)]);

  const clearPokemonList = () => {
    setPokemonCapturedList([]);
    sessionStorage.setItem('pokemonList', null);
  };

  const updatedPokemonList = (filteredPokemonList: Pokemon[]) => {
    setPokemonSquad(filteredPokemonList);
  };

  const addPokemonToSquad = (id: number) => {
    const filteredList = pokemonCapturedList.filter(
      (pokemon) => pokemon.id === id
    );
    const pokemonSquadList = [...pokemonSquadTeam, ...filteredList];
    setPokemonSquad(pokemonSquadList);
  };

  const removePokemonFromCaptured = (id: number) => {
    const filteredPokemonList: Pokemon[] = pokemonCapturedList.filter(
      (pokemon) => pokemon.id !== id
    );
    const stringfiedPokemonList = JSON.stringify(filteredPokemonList);
    setPokemonCapturedList(filteredPokemonList);
    sessionStorage.setItem('pokemonList', stringfiedPokemonList);
    updatedPokemonList(filteredPokemonList);
  };

  const clearSquadList = () => {
    setPokemonSquad([]);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {!pokemonCapturedList ? (
          <p style={{ color: '#fff', fontSize: '18px' }}>
            Capture at least one Pokémon to start your team!
          </p>
        ) : (
          <>
            <div className={styles.containerAlt}>
              <div className={styles.content}>
                <p>My Captured Pokémon</p>
                <PokemonList
                  key={JSON.stringify(pokemonSquadTeam)}
                  pokemonSquadList={pokemonSquadTeam}
                  pokemonList={pokemonCapturedList}
                  addPokemon={addPokemonToSquad}
                  removePokemon={removePokemonFromCaptured}
                />
                <Button
                  style={{ width: '100%', marginTop: 'auto' }}
                  variant="danger"
                  onClick={clearPokemonList}
                >
                  <label style={{ cursor: 'pointer' }}>Clear List</label>
                </Button>
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
                    <Button variant="danger" onClick={clearSquadList}>
                      <label style={{ cursor: 'pointer' }}>Clear List</label>
                    </Button>
                  </>
                ) : (
                  <label style={{ cursor: 'pointer' }}>
                    Select Pokémons to create your squad!
                  </label>
                )}
              </div>
            </div>
          </>
        )}
        <InfoDialog info="myTeam" />
        <Dropzone />
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
