import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Pages.module.css';
import { useState } from 'react';
import { Button, Container, Toast } from 'react-bootstrap';
import PokemonCard from '../components/pokemon-card/pokemon-card';
import PokemonSearchInput from '../components/pokemon-search-input/pokemon-search-input';
import { PokemonApiService } from '../services/pokemon-services';
import { ErrorService } from '../services/error-services';
import NotFoundPokemon from '../components/not-found-pokemon/not-found-pokemon';
import PokemonLoader from '../components/pokeball-loader/pokemon-loader';
import Navbar from '../components/navbar/navbar';
import { Pokemon } from '../models/pokemon-model';
import React from 'react';
import PokemonListContext from '../contexts/pokemon-list-context';
import PokemonContext from '../contexts/pokemon-context';
import InfoDialog from '../components/info-dialog/info-dialog';
import Link from 'next/link';

const initialPokeList: Pokemon[] = [];

export default function Home() {
  // HOOK ZONE
  const [inputValue, setValue] = useState('');
  const [pokemonCaptureList, setPokemonCaptureList] = useState(initialPokeList);
  const [selectedCard, toggleSelected] = useState(false);
  const [showSuccesToast, setSuccesToast] = useState(false);
  const [showErrorToast, setErrorToast] = useState(false);
  const [notFound, setNotFoundState] = useState(false);
  const [searching, setSearchingState] = useState(false);
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  const [listContext, setListContext] = useState<Pokemon[] | null>([]);
  const [context, setContext] = useState<Pokemon | null>(null);

  // FUNCTIONS ZONE

  const getTypedValue = (inputValue: string) => {
    setValue(inputValue);
  };

  const getSearchedPokemon = () => {
    const stringPokemonDetails = JSON.stringify(searchedPokemon);
    sessionStorage.setItem('pokemonDetails', stringPokemonDetails);
  };

  const selectPokemon = () => {
    toggleSelected(!selectedCard);
    const element = document.getElementById('pokemonCard');
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  };

  const handleKeyUp = (event: any) => {
    const typedValue = event.target.value;
    if (event.key === 'Enter') {
      setValue(typedValue);
      search(typedValue);
    }
    getTypedValue(typedValue);
  };

  const clearSelectedPokemon = (clear: boolean) => {
    if (clear) {
      setContext(null);
      setSearchedPokemon(null);
      setValue('');
    }
  };

  const search = (pokemon: string) => {
    if (pokemon.length === 0) {
      return;
    } else {
      setSearchingState(true);
      setNotFoundState(false);
      const pokemonNameOrId = pokemon.toLocaleLowerCase();
      PokemonApiService.searchPokemon(pokemonNameOrId)
        .then((response: any) => {
          setSearchedPokemon(response);
          setContext(response);
          toggleSelected(false);
          setSearchingState(false);
        })
        .catch((error) => {
          const errorCode = error.response.status;
          ErrorService.setErrorStatus(errorCode);
          setSearchedPokemon(null);
          setNotFoundState(true);
          setContext(null);
          setSearchingState(false);
        });
    }
  };

  const catchPokemon = () => {
    let pokeList: Pokemon[] = [];
    const storageList = JSON.parse(sessionStorage.getItem('pokemonList'));
    if (storageList) {
      pokeList = storageList;
      if (storageList.find((pokemon) => pokemon.id === searchedPokemon.id)) {
        setErrorToast(true);
        return;
      }
    }
    setListContext([...pokeList, searchedPokemon]);
    const stringPokemonList = JSON.stringify([...pokeList, searchedPokemon]);
    sessionStorage.setItem('pokemonList', stringPokemonList);
    setPokemonCaptureList([...pokeList, searchedPokemon]);
    setSuccesToast(true);
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokemonListContext.Provider value={{ listContext, setListContext }}>
        <PokemonContext.Provider value={{ context, setContext }}>
          <Navbar />

          {/* CONTENT */}
          <main className={styles.main} onKeyUp={handleKeyUp}>
            <h1 className={styles.title}>Welcome to Pokenext!</h1>
            <PokemonSearchInput
              required={true}
              getTypedValue={getTypedValue}
              clearSelectedPokemon={clearSelectedPokemon}
            />
            <Container className={styles.buttonContainer}>
              <Button
                variant={
                  inputValue.length === 0 || searching ? 'secondary' : 'success'
                }
                className={styles.button}
                onClick={() => search(inputValue)}
                disabled={inputValue.length === 0 || !inputValue || searching}
              >
                <label className={styles.buttonLabel}>Search Pokemon!</label>
              </Button>
              <Button
                variant={
                  searchedPokemon && !searching ? 'primary' : 'secondary'
                }
                className={styles.button}
                onClick={getSearchedPokemon}
                disabled={!searchedPokemon}
              >
                {searchedPokemon ? (
                  <Link
                    href={{
                      pathname: `pokemon-details/id=${searchedPokemon.id}`,
                    }}
                  >
                    <label className={styles.buttonLabel}>
                      Get Pokemon Info
                    </label>
                  </Link>
                ) : (
                  <label className={styles.buttonLabel}>Get Pokemon Info</label>
                )}
              </Button>
            </Container>

            {searchedPokemon && !searching ? (
              <section id="pokemonCard">
                <PokemonCard
                  selected={selectedCard}
                  onClick={selectPokemon}
                  pokemon={searchedPokemon}
                />
              </section>
            ) : (
              <></>
            )}
            {!notFound && !searching && !searchedPokemon ? (
              <Image
                width={144}
                height={144}
                src={'/svg/pokeball.svg'}
                alt="pokeball"
              />
            ) : (
              <></>
            )}
            {notFound ? <NotFoundPokemon /> : <></>}
            {searching && !notFound ? <PokemonLoader /> : <></>}

            {selectedCard && searchedPokemon ? (
              <Button
                variant="flat"
                className={`${styles.catchPokemonBtn} mt-3`}
                onClick={catchPokemon}
              >
                Catch Pokémon!
              </Button>
            ) : null}
            <Toast
              onClose={() => setSuccesToast(false)}
              show={showSuccesToast}
              delay={3000}
              autohide
              className="mt-3"
              bg="success"
            >
              <Toast.Body style={{ color: '#ffffff' }}>
                Woohoo, Pokémon captured!
              </Toast.Body>
            </Toast>
            <Toast
              onClose={() => setErrorToast(false)}
              show={showErrorToast}
              delay={3000}
              autohide
              className="mt-3"
              bg="danger"
            >
              <Toast.Body style={{ color: '#ffffff' }}>
                Sorry, you've already captured this Pokémon! Try another one
              </Toast.Body>
            </Toast>
            <InfoDialog info="pokedex" />
          </main>
        </PokemonContext.Provider>
      </PokemonListContext.Provider>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {'Victor'}
        </a>
      </footer>
    </div>
  );
}
