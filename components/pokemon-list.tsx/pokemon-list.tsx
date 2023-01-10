import { Pokemon } from '../../models/pokemon-model';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './pokemon-list.module.css';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Props {
  pokemonList: Pokemon[];
  pokemonSquadList: Pokemon[];
  addPokemon: (id: number) => void;
  removePokemon: (id: number) => void;
}

const PokemonList: React.FC<Props> = ({
  pokemonList = [],
  pokemonSquadList,
  addPokemon,
  removePokemon,
}) => {
  const [currentIndex, setIndex] = useState(null);

  const selectPokemon = (index: number) => {
    if (currentIndex === index) {
      setIndex(null);
    } else {
      setIndex(index);
    }
  };

  const disablePokemon = (id: number) => {
    if (pokemonSquadList.find((pokemon) => pokemon.id === id)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <ListGroup as="ul" style={{ borderRadius: '8px' }}>
        {pokemonList.map((pokemon, index) => (
          <div key={pokemon.id} className={styles.listItem}>
            {currentIndex === index && !disablePokemon(pokemon.id) ? (
              <ListGroup.Item
                as="li"
                onClick={() => selectPokemon(index)}
                active
                className={styles.activeContainer}
              >
                <label className={styles.listLabel}>
                  {pokemon.id} - {pokemon.name}
                </label>
                <div className={styles.iconBox}>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`add-tooltip-top`}>
                        Add Pokémon to the team
                      </Tooltip>
                    }
                  >
                    <FontAwesomeIcon
                      titleId="add-icon1"
                      fontSize="24"
                      cursor="pointer"
                      onClick={() => addPokemon(pokemon.id)}
                      icon={faSquarePlus}
                    />
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`release-tooltip-top`}>
                        Release Pokémon
                      </Tooltip>
                    }
                  >
                    <FontAwesomeIcon
                      titleId="trash-icon1"
                      fontSize="22"
                      cursor="pointer"
                      onClick={() => removePokemon(pokemon.id)}
                      icon={faTrash}
                    />
                  </OverlayTrigger>
                </div>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item
                className={styles.selectedItem}
                as="li"
                onClick={() => selectPokemon(index)}
                disabled={disablePokemon(pokemon.id)}
              >
                <label className={styles.listLabel}>
                  {pokemon.id} - {pokemon.name}
                </label>
                {disablePokemon(pokemon.id) ? (
                  <Badge pill bg="success">
                    Selected
                  </Badge>
                ) : (
                  <></>
                )}
              </ListGroup.Item>
            )}
          </div>
        ))}
      </ListGroup>
    </>
  );
};

export default PokemonList;
