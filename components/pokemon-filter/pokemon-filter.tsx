import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Pokemon } from '../../models/pokemon-model';
import { Checkbox } from '../checkbox/checkbox';
import PokemonTypeBadge from '../pokemon-type-badge/pokemon-type-badge';
import styles from './pokemon-filter.module.css';

interface Props {
  pokemonList: Pokemon[];
  getSelectedTypes: (value: any[]) => void;
}

const pokemonTypes = [
  { type: 'normal', checked: false },
  { type: 'fire', checked: false },
  { type: 'water', checked: false },
  { type: 'grass', checked: false },
  { type: 'flying', checked: false },
  { type: 'fighting', checked: false },
  { type: 'poison', checked: false },
  { type: 'electric', checked: false },
  { type: 'ground', checked: false },
  { type: 'rock', checked: false },
  { type: 'psychic', checked: false },
  { type: 'ice', checked: false },
  { type: 'bug', checked: false },
  { type: 'ghost', checked: false },
  { type: 'steel', checked: false },
  { type: 'dragon', checked: false },
  { type: 'dark', checked: false },
  { type: 'fairy', checked: false },
];

const PokemonFilter: React.FC<Props> = ({
  pokemonList = [],
  getSelectedTypes,
}) => {
  const [unavailableTypeDisplay, toggleUnavailableTypeDisplay] =
    useState(false);
  const [showTypes, toggleShowTypes] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    // console.log(selectedTypes);
  });

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    let array = [];
    if (checked) {
      array = [...selectedTypes, value];
    } else {
      array = selectedTypes.filter((e) => e !== value);
    }
    setSelectedTypes(array);
    getSelectedTypes(array);
  };

  const handleDisplayChange = () => {
    toggleUnavailableTypeDisplay(!unavailableTypeDisplay);
  };

  const toggleShowTypesContainer = () => {
    toggleShowTypes(!showTypes);
  };

  const disablePokemonType = (filterType: string) => {
    let isDisabled: boolean;
    let pokemonTypeList: string[] = [];
    pokemonList.forEach((pokemon) => {
      pokemon.types.forEach(
        (type) => (pokemonTypeList = [...pokemonTypeList, type.type.name])
      );
    });
    const pokemonFilteredTypeList = pokemonTypeList.filter((element, index) => {
      return pokemonTypeList.indexOf(element) === index;
    });
    pokemonFilteredTypeList.includes(filterType)
      ? (isDisabled = false)
      : (isDisabled = true);
    return isDisabled;
  };

  return (
    <>
      <div className={styles.typeButton} onClick={toggleShowTypesContainer}>
        <span>Filter by type</span>
        {!showTypes ? (
          <FontAwesomeIcon
            titleId="arrow-icon1"
            fontSize="16"
            color="#3b4cca"
            cursor="pointer"
            icon={faCaretDown}
          />
        ) : (
          <FontAwesomeIcon
            titleId="arrow-icon1"
            fontSize="16"
            color="#3b4cca"
            cursor="pointer"
            icon={faCaretUp}
          />
        )}
      </div>
      {showTypes ? (
        <>
          <div style={{ paddingLeft: '3px', paddingBottom: '4px' }}>
            <input
              checked={unavailableTypeDisplay}
              type="checkbox"
              onChange={handleDisplayChange}
            />
            <span style={{ paddingLeft: '8px' }}>
              Hide unavailable type options
            </span>
          </div>
          <div className={styles.typeContainer}>
            {pokemonTypes.map((type, index) => (
              <div key={index}>
                {disablePokemonType(type.type) && unavailableTypeDisplay ? (
                  <></>
                ) : (
                  <div className={styles.typeContent}>
                    <input
                      type="checkbox"
                      onChange={handleChange}
                      disabled={disablePokemonType(type.type)}
                      value={type.type}
                      checked={selectedTypes.includes(type.type)}
                    />
                    <PokemonTypeBadge
                      pokemonType={type.type}
                      disabled={disablePokemonType(type.type)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PokemonFilter;
