import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  Cell,
} from 'recharts';
import { Pokemon } from '../../models/pokemon-model';
import { PokemonStats } from '../../models/pokemon-stats-model';

interface Props {
  pokemon?: Pokemon;
}

const PokemonChart = ({ pokemon }: Props) => {
  const [pokemonStatsList, setPokemonStatsList] = useState([]);
  const [maxStatIndex, setMaxStatIndex] = useState(null);
  const [minStatIndex, setMinStatIndex] = useState(null);

  useEffect(() => {
    buildPokemonStats();
  }, [JSON.stringify(pokemon)]);

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
            <Cell key={index} fill={fillBars(entry.value)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PokemonChart;
