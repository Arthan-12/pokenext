import { atom, RecoilState } from 'recoil';
import { Pokemon } from '../models/pokemon-model';

export const selectedPokemonState: RecoilState<Pokemon> = atom({
  key: 'selectedPokemonState',
  default: {},
});

export const pokemonListState: RecoilState<Pokemon[]> = atom({
  key: 'pokemonListState',
  default: [{}],
});
