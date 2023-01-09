import { Pokemon } from '../../models/pokemon-model';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './pokemon-list.module.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Props {
  pokemonList: Pokemon[];
  addPokemon: (id: number) => void;
  removePokemon: (id: number) => void;
}

const PokemonList: React.FC<Props> = ({
  pokemonList = [],
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

  return (
    <>
      <ListGroup as="ul">
        {pokemonList.map((pokemon, index) => (
          <div key={pokemon.id}>
            {currentIndex === index ? (
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
              <ListGroup.Item as="li" onClick={() => selectPokemon(index)}>
                {pokemon.id} - {pokemon.name}
              </ListGroup.Item>
            )}
          </div>
        ))}
      </ListGroup>
    </>
  );
};

export default PokemonList;
