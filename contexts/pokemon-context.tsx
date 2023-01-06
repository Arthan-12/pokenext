import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { Pokemon } from '../models/pokemon-model';

// APPROACH 1

// // export type PokemonContextType = {
// //   pokemonList: Pokemon[];
// //   saveTodo: (pokemon: Pokemon) => void;
// //   updateTodo: (id: number) => void;
// // };

// // const PokemonContext = createContext<Pokemon | null>(null);

// // export default PokemonContext;

// APPROACH 2

// type PokemonType = {
//   name: string;
//   id: number;
//   sprites: any;
//   // types: string[];
//   weight: number;
//   height: number;
//   order: number;
// };

// type PropsPokemonContext = {
//   state: PokemonType | null;
//   setSelectedPokemon: React.Dispatch<React.SetStateAction<PokemonType>>;
// };

// const DEFAULT_VALUE = {
//   state: {
//     name: '',
//     id: 0,
//     sprites: '',
//     // types: [],
//     weight: 0,
//     height: 0,
//     order: 0,
//   },
//   setSelectedPokemon: () => {},
// };

// const PokemonContext = createContext<Partial<PropsPokemonContext>>({});

// const PokemonContextProvider: React.FC = ({ children }: any) => {
//   const [state, setSelectedPokemon] = useState(DEFAULT_VALUE.state);
//   return (
//     <PokemonContext.Provider value={{ state, setSelectedPokemon }}>
//       {children}
//     </PokemonContext.Provider>
//   );
// };

// export { PokemonContextProvider };
// export default PokemonContext;

// APPROACH 3
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
