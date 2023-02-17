import { useState } from 'react';
import { Card, Nav, Button, Container } from 'react-bootstrap';
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

const PokemonDetailCard = ({ pokemon }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [pokemonStatsList, setPokemonStatsList] = useState([]);
  const [maxStatIndex, setMaxStatIndex] = useState(null);
  const [minStatIndex, setMinStatIndex] = useState(null);

  const tabItemList = ['info', 'stats'];

  const selectTab = (index: number) => {
    setActiveTabIndex(index);

    if (index === 1) {
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
    // const index = statValueList.indexOf(max);
    setMaxStatIndex(max);
  };

  const getMinStat = (pokemonStatList: PokemonStats[]) => {
    let statValueList: number[] = [];
    pokemonStatList.forEach(
      (stat) => (statValueList = [...statValueList, stat.value])
    );
    const min = Math.min(...statValueList);
    // const index = statValueList.indexOf(min);
    setMinStatIndex(min);
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

  return (
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
        <Card.Img
          className={styles.imageContainer}
          variant="top"
          src={pokemon!.sprites?.front_default}
        />
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
        <Button variant="primary">Go somewhere</Button>
      </Card.Footer>
    </Card>
  );
};

export default PokemonDetailCard;
