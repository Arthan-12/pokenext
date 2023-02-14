import { useState } from 'react';
import { DropdownButton, Dropdown, Badge } from 'react-bootstrap';
import { Pokemon } from '../../models/pokemon-model';

interface Props {
  pokemonList: Pokemon[];
  getOrderedPokemonList: (pokemonOrderedList: any) => void;
}

const PokemonOrderBy: React.FC<Props> = ({
  pokemonList = [],
  getOrderedPokemonList,
}) => {
  const [selectedOption, setOrderOption] = useState('');
  const [orderedPokemonList, setOrderedPokemonList] = useState(pokemonList);
  const orderByOptions = ['ID', 'Name'];

  const handleSelectOption = (option: string) => {
    setOrderOption(option);
    orderPokemonList(option);
  };

  const orderPokemonList = (option: string) => {
    if (option === orderByOptions[0]) {
      pokemonList.sort((a, b) => a.id - b.id);
    }
    if (option === orderByOptions[1]) {
      pokemonList.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    setOrderedPokemonList(pokemonList);
    getOrderedPokemonList({
      pokemonList: pokemonList,
      orderBy: selectedOption,
    });
  };

  return (
    <>
      <DropdownButton
        title="Order By"
        variant="light"
        style={{ paddingBottom: '8px' }}
      >
        {orderByOptions.map((option, index) => (
          <Dropdown.Item
            key={index}
            style={{ display: 'flex', justifyContent: 'space-between' }}
            onClick={() => handleSelectOption(option)}
            disabled={option === selectedOption}
          >
            {option}
            {option === selectedOption ? (
              <Badge pill bg="success">
                Selected
              </Badge>
            ) : (
              <></>
            )}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </>
  );
};

export default PokemonOrderBy;
