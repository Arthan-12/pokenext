import api from '../pages/api/pokemon-api';

export const PokemonApiService = {
  searchPokemon: async (pokemon: string) => {
    const response = await api.request({
      url: `/pokemon/${pokemon}`,
      method: 'GET',
    });

    return response.data;
  },
};
