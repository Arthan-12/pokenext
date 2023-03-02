import { useState } from 'react';
import { Card, Nav, Button, Container, Carousel, Toast } from 'react-bootstrap';
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Pokemon } from '../../models/pokemon-model';
import { PokemonStats } from '../../models/pokemon-stats-model';
import PokemonCarousel from '../pokemon-carousel/pokemon-carousel';
import PokemonChart from '../pokemon-chart/pokemon-chart';
import PokemonTypeBadge from '../pokemon-type-badge/pokemon-type-badge';
import styles from './pokemon-detail-card.module.css';

interface Props {
  pokemon?: Pokemon;
}

const initialPokeList: Pokemon[] = [];

const PokemonDetailCard = ({ pokemon }: Props) => {
  const [pokemonCaptureList, setPokemonCaptureList] = useState(initialPokeList);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showSuccesToast, setSuccesToast] = useState(false);
  const [showErrorToast, setErrorToast] = useState(false);

  const tabItemList = ['info', 'stats'];

  const selectTab = (index: number) => {
    setActiveTabIndex(index);
  };

  const catchPokemon = () => {
    let pokeList: Pokemon[] = [];
    const storageList = JSON.parse(sessionStorage.getItem('pokemonList'));
    if (storageList) {
      pokeList = storageList;
      if (
        storageList.find((storagePokemon) => storagePokemon.id === pokemon.id)
      ) {
        setErrorToast(true);
        return;
      }
    }
    const stringPokemonList = JSON.stringify([...pokeList, pokemon]);
    sessionStorage.setItem('pokemonList', stringPokemonList);
    setPokemonCaptureList([...pokeList, pokemon]);
    setSuccesToast(true);
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title
            style={{
              textAlign: 'center',
              textTransform: 'capitalize',
              fontSize: '24px',
            }}
          >
            {pokemon.name}
          </Card.Title>
          <Nav variant="tabs">
            {tabItemList.map((item, index) => (
              <Nav.Item key={index} onClick={() => selectTab(index)}>
                <Nav.Link
                  active={activeTabIndex === index ? true : false}
                  style={{ textTransform: 'capitalize' }}
                  className={styles.tabItem}
                >
                  {item}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          <PokemonCarousel pokemon={pokemon} />
          {activeTabIndex === 0 ? (
            <Container
              className={styles.infoContainer}
              style={{ width: '460px' }}
            >
              <ul>
                <li>
                  Type:{' '}
                  {pokemon!.types?.map((pokemonType, index) => (
                    <PokemonTypeBadge
                      key={index}
                      pokemonType={pokemonType.type.name}
                    ></PokemonTypeBadge>
                  ))}
                </li>
                <li>Id: {pokemon.id}</li>
                <li>Order: {pokemon.order}</li>
                <li>Weight: {pokemon.weight}</li>
                <li>Height: {pokemon.height}</li>
              </ul>
            </Container>
          ) : (
            <></>
          )}
          {activeTabIndex === 1 ? <PokemonChart pokemon={pokemon} /> : <></>}
        </Card.Body>
        <Card.Footer style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" onClick={catchPokemon}>
            Catch Pokémon!
          </Button>
        </Card.Footer>
      </Card>
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
    </>
  );
};

export default PokemonDetailCard;
