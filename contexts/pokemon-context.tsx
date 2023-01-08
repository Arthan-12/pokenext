import React, { createContext } from 'react';
import { Pokemon } from '../models/pokemon-model';

type PokemonContextType = {
  context: Pokemon | null;
  setContext: React.Dispatch<React.SetStateAction<Pokemon | null>>;
};

const pokemonContextState = {
  context: null,
  setContext: () => {},
};

const PokemonContext = createContext<PokemonContextType>(pokemonContextState);

export default PokemonContext;
