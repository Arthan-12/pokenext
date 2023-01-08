import { createContext } from 'react';
import { Pokemon } from '../models/pokemon-model';

type PokemonListContextType = {
  listContext: Pokemon[] | null;
  setListContext: React.Dispatch<React.SetStateAction<Pokemon[] | null>>;
};

const pokemonListContextState = {
  listContext: [],
  setListContext: () => {},
};

const PokemonListContext = createContext<PokemonListContextType>(
  pokemonListContextState
);

export default PokemonListContext;
