import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
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
  Text,
} from 'recharts';
import { Pokemon } from '../../models/pokemon-model';
import { PokemonStats } from '../../models/pokemon-stats-model';
import PokemonTypeBadge from '../pokemon-type-badge/pokemon-type-badge';
import styles from './pokemon-detail-card.module.css';

interface Props {
  pokemon?: Pokemon;
}

const initialPokeList: Pokemon[] = [];

const PokemonDetailCard = ({ pokemon }: Props) => {
  const [pokemonCaptureList, setPokemonCaptureList] = useState(initialPokeList);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [carouselIndex, setIndex] = useState(0);
  const [pokemonStatsList, setPokemonStatsList] = useState([]);
  const [pokemonImageList, setPokemonImageList] = useState([]);
  const [maxStatIndex, setMaxStatIndex] = useState(null);
  const [minStatIndex, setMinStatIndex] = useState(null);
  const [showSuccesToast, setSuccesToast] = useState(false);
  const [showErrorToast, setErrorToast] = useState(false);

  const tabItemList = ['info', 'stats'];

  useEffect(() => {
    if (activeTabIndex === 0) {
      buildCarousel();
    }
  }, [JSON.stringify(pokemon)]);

  const selectTab = (index: number) => {
    setActiveTabIndex(index);
    if (index === 0) {
      buildCarousel();
    } else if (index === 1) {
      buildPokemonStats();
    }
  };

  const buildPokemonStats = () => {
    let builtPokemonStatsList: PokemonStats[] = [];
    pokemon.stats.forEach((stat) => {
      let pokemonStatsInfo: PokemonStats = {
        name: stat.stat.name,
        value: stat.base_stat,
      };

      builtPokemonStatsList = [...builtPokemonStatsList, pokemonStatsInfo];
    });
    setPokemonStatsList(builtPokemonStatsList);
    getMaxStat(builtPokemonStatsList);
    getMinStat(builtPokemonStatsList);
    console.log(builtPokemonStatsList);
  };

  const getMaxStat = (pokemonStatList: PokemonStats[]) => {
    let statValueList: number[] = [];
    pokemonStatList.forEach(
      (stat) => (statValueList = [...statValueList, stat.value])
    );
    const max = Math.max(...statValueList);
    setMaxStatIndex(max);
  };

  const getMinStat = (pokemonStatList: PokemonStats[]) => {
    let statValueList: number[] = [];
    pokemonStatList.forEach(
      (stat) => (statValueList = [...statValueList, stat.value])
    );
    const min = Math.min(...statValueList);
    setMinStatIndex(min);
  };

  const buildCarousel = () => {
    let pokemonImageList: string[] = [];
    pokemonImageList = [
      ...pokemonImageList,
      pokemon.sprites.front_default,
      pokemon.sprites.back_default,
      pokemon.sprites.front_shiny,
      pokemon.sprites.back_shiny,
    ];
    setPokemonImageList(pokemonImageList);
  };

  const fillBars = (value: number) => {
    let barColor: string;
    if (value === maxStatIndex) {
      return (barColor = 'green');
    }
    if (value === minStatIndex) {
      return (barColor = 'red');
    } else {
      barColor = '#3b4cca';
    }
    return barColor;
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
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

  const imageSubtitle = (index) => {
    let subtitleText: string;
    if (index === 0) {
      return (subtitleText = `${pokemon.name} front view`);
    } else if (index === 1) {
      return (subtitleText = `${pokemon.name} back view`);
    } else if (index === 2) {
      return (subtitleText = `shiny ${pokemon.name} front view`);
    } else if (index === 3) {
      return (subtitleText = `shiny ${pokemon.name} front view`);
    }
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
          <Carousel
            keyboard={true}
            activeIndex={carouselIndex}
            onSelect={handleSelect}
            interval={null}
            prevIcon={
              <span
                className={styles.carouselPrevChevron}
                style={{ color: '#3b4cca' }}
              >
                <FontAwesomeIcon fontSize="18" icon={faChevronLeft} />
              </span>
            }
            nextIcon={
              <span
                className={styles.carouselNextChevron}
                style={{ color: '#3b4cca' }}
              >
                <FontAwesomeIcon fontSize="18" icon={faChevronRight} />
              </span>
            }
            className={styles.carouselContainer}
          >
            {pokemonImageList.map((image, index) => (
              <Carousel.Item key={index}>
                <Card.Img
                  className={styles.imageContainer}
                  variant="top"
                  src={pokemonImageList[index]}
                />
                <Carousel.Caption>
                  <label style={{ color: '#3b4cca' }}>
                    {imageSubtitle(index)}
                  </label>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

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
          {activeTabIndex === 1 ? (
            <ResponsiveContainer width="120%" height={300}>
              <BarChart
                data={pokemonStatsList}
                margin={{
                  top: 15,
                  bottom: 5,
                  right: 20,
                }}
                style={{ fontSize: '12px' }}
              >
                <XAxis dataKey="name" interval={0} />
                <YAxis />
                <Tooltip cursor={{ strokeWidth: 0.5 }} />
                <Bar barSize={24} dataKey="value" fill="#3b4cca">
                  <LabelList dataKey="value" position={'top'} />
                  {pokemonStatsList.map((entry, index) => (
                    <Cell
                      key={index}
                      className={styles.statBar}
                      fill={fillBars(entry.value)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <></>
          )}
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
