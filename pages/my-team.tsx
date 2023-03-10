import styles from '../styles/Pages.module.css';
import Navbar from '../components/navbar/navbar';
import DragAndDrop from '../components/drag-and-drop/drag-and-drop';
import { useState, useEffect } from 'react';
import { Pokemon } from '../models/pokemon-model';
import { Button } from 'react-bootstrap';
import PokemonList from '../components/pokemon-list.tsx/pokemon-list';
import InfoDialog from '../components/info-dialog/info-dialog';
import PokemonSearchInput from '../components/pokemon-search-input/pokemon-search-input';
import PokemonOrderBy from '../components/pokemon-order-by/pokemon-order-by';
import ConfirmDialog from '../components/confirm-dialog/confirm-dialog';
import PokemonFilter from '../components/pokemon-filter/pokemon-filter';

const initialPokeList: Pokemon[] = [];

export default function MyTeam() {
  // HOOK ZONE
  const [pokemonCapturedList, setPokemonCapturedList] =
    useState(initialPokeList);
  const [pokemonFilteredCapturedList, setPokemonFilteredCapturedList] =
    useState(pokemonCapturedList);
  const [pokemonSquadTeam, setPokemonSquad] = useState(initialPokeList);
  const [inputValue, setValue] = useState('');
  const [selectedPokemonTypes, setSelectedTypes] = useState([]);
  const [orderBy, setOrderBy] = useState(null);
  const [confirmDialogShow, setDialogShow] = useState(false);
  const [deletePokemonList, setDeletePokemonList] = useState(false);
  let pokemonList: Pokemon[] = [];

  // PAGE INIT ZONE

  if (typeof window !== 'undefined') {
    pokemonList = JSON.parse(sessionStorage.getItem('pokemonList'));
  }

  useEffect(() => {
    setPokemonCapturedList(pokemonList);
    setPokemonFilteredCapturedList(pokemonList);
  }, [JSON.stringify(pokemonList)]);

  // const clearPokemonList = () => {
  //   setPokemonCapturedList([]);
  //   sessionStorage.setItem('pokemonList', null);
  // };

  // FUNCTIONS ZONE

  const deleteConfirmation = (confirm?: boolean) => {
    if (confirm) {
      setPokemonCapturedList([]);
      sessionStorage.setItem('pokemonList', null);
      setDeletePokemonList(false);
    }
    setDialogShow(false);
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

  const filterPokemonValue = (inputValue: string) => {
    setValue(inputValue);
    let filteredPokemon: Pokemon[] = [];
    if (inputValue.length > 0) {
      filteredPokemon = pokemonCapturedList.filter(
        (pokemon) =>
          pokemon.id.toString().includes(inputValue.toLowerCase()) ||
          pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    } else {
      filteredPokemon = pokemonCapturedList;
    }
    setPokemonFilteredCapturedList(filteredPokemon);
  };

  const filterPokemonByType = (selectedTypes: string[]) => {
    let filteredPokemon: Pokemon[] = [];
    if (selectedTypes.length > 0) {
      pokemonCapturedList.forEach((pokemon) =>
        pokemon.types.forEach((pokemonType) => {
          if (selectedTypes.includes(pokemonType.type.name)) {
            filteredPokemon = [...filteredPokemon, pokemon];
          } else {
            return;
          }
        })
      );
    } else {
      filteredPokemon = pokemonCapturedList;
    }
    filteredPokemon = filteredPokemon.filter((pokemon, index) => {
      return filteredPokemon.indexOf(pokemon) === index;
    });
    setSelectedTypes(selectedTypes);
    setPokemonFilteredCapturedList(filteredPokemon);
  };

  const handleKeyUp = (event: any) => {
    const typedValue = event.target.value;
    filterPokemonValue(typedValue);
  };

  const getSelectedTypes = (selectedTypes: string[]) => {
    filterPokemonByType(selectedTypes);
  };

  const getOrderedPokemonList = (pokemonOrderedList: any) => {
    setPokemonFilteredCapturedList(pokemonOrderedList.pokemonList);
    setOrderBy(pokemonOrderedList.orderBy);
  };

  const clearInputFilter = () => {
    setValue('');
    setPokemonCapturedList(pokemonCapturedList);
    setPokemonFilteredCapturedList(pokemonCapturedList);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {!pokemonCapturedList ? (
          <p style={{ color: '#fff', fontSize: '18px' }}>
            Capture at least one Pok??mon to start your team!
          </p>
        ) : (
          <>
            <div className={styles.containerAlt}>
              <div className={styles.content} onKeyUp={handleKeyUp}>
                <p>My Captured Pok??mon</p>
                <PokemonSearchInput
                  getTypedValue={filterPokemonValue}
                  clearSelectedPokemon={clearInputFilter}
                />
                <PokemonFilter
                  pokemonList={pokemonCapturedList}
                  getSelectedTypes={getSelectedTypes}
                />
                <PokemonOrderBy
                  getOrderedPokemonList={getOrderedPokemonList}
                  pokemonList={pokemonCapturedList}
                />
                {inputValue.length > 0 ||
                selectedPokemonTypes.length > 0 ||
                orderBy ? (
                  <PokemonList
                    key={JSON.stringify(pokemonFilteredCapturedList)}
                    pokemonSquadList={pokemonSquadTeam}
                    pokemonList={pokemonFilteredCapturedList}
                    addPokemon={addPokemonToSquad}
                    removePokemon={removePokemonFromCaptured}
                  />
                ) : (
                  <PokemonList
                    key={JSON.stringify(pokemonSquadTeam)}
                    pokemonSquadList={pokemonSquadTeam}
                    pokemonList={pokemonCapturedList}
                    addPokemon={addPokemonToSquad}
                    removePokemon={removePokemonFromCaptured}
                  />
                )}

                <Button
                  style={{ width: '100%', marginTop: 'auto' }}
                  variant="danger"
                  onClick={() => setDialogShow(true)}
                >
                  <label style={{ cursor: 'pointer' }}>Clear List</label>
                </Button>
                <ConfirmDialog
                  dialogText="Do you really want to delete this list?"
                  dialogSubtext="This process is irreversible and all your Pok??mon will be lost"
                  show={confirmDialogShow}
                  confirmAction={deleteConfirmation}
                />
              </div>
              <div className={styles.content}>
                <p>My Pok??mon Squad!</p>
                {pokemonSquadTeam.length > 0 ? (
                  <>
                    <DragAndDrop
                      key={JSON.stringify(pokemonSquadTeam)}
                      pokemonSquad={pokemonSquadTeam}
                      updatedPokemonList={updatedPokemonList}
                    ></DragAndDrop>
                    <Button
                      variant="danger"
                      style={{ marginTop: 'auto' }}
                      onClick={clearSquadList}
                    >
                      <label style={{ cursor: 'pointer' }}>Clear List</label>
                    </Button>
                  </>
                ) : (
                  <label style={{ cursor: 'pointer' }}>
                    Select Pok??mons to create your squad!
                  </label>
                )}
              </div>
              {/* ONGOING MULTIPLE DND */}
              {/* <div className={styles.content}>
                <p>Multiple DnD</p>
                {pokemonSquadTeam.length > 0 ? (
                  <>
                    <Dropzone pokemonList={pokemonSquadTeam} />
                  </>
                ) : (
                  <></>
                )}
              </div> */}
            </div>
          </>
        )}
        <InfoDialog info="myTeam" />
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
