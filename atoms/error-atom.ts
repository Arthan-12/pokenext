import { atom, RecoilState } from 'recoil';

export const notFoundPokemonState = atom({
  key: 'notFoundPokemonState',
  default: false,
});
