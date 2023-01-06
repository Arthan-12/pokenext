import { createContext } from 'react';
import { Pokemon } from '../models/pokemon-model';

type PokemonListContextType = {
  context: Pokemon[] | null;
  setContext: React.Dispatch<React.SetStateAction<Pokemon[] | null>>;
};

const pokemonListContextState = {
  context: [],
  setContext: () => {},
};

const PokemonListContext = createContext<PokemonListContextType>(
  pokemonListContextState
);

export default PokemonListContext;
