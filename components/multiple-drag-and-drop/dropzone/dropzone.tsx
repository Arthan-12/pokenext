import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from '../draggable/draggable';
import { Droppable } from '../droppable/droppable';
import { Pokemon } from '../../../models/pokemon-model';
import PokemonDropListItem from '../../pokemon-drop-list-item/pokemon-drop-list-item';
import styles from './dropzone.module.css';

interface Props {
  pokemonList: Pokemon[];
}

const Dropzone: React.FC<Props> = ({ pokemonList }) => {
  const containers = ['A', 'B'];
  const [parent, setParent] = useState(null);

  const removePokemon = (id: number) => {
    // const filteredPokemonList: Pokemon[] = itemList.filter(
    //   (pokemon) => pokemon.id !== id
    // );
    // setItemList(filteredPokemonList);
    // updatedPokemonList(filteredPokemonList);
    console.log(id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} id={'DndContext0'}>
      {parent === null ? (
        <>
          {pokemonList?.map((pokemon, index) => (
            <Draggable id={pokemon.id} key={pokemon.id}>
              <PokemonDropListItem
                pokemon={pokemon}
                removePokemon={() => removePokemon(pokemon.id)}
              />
            </Draggable>
          ))}
        </>
      ) : null}
      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {parent === id ? (
            <>
              {/* {pokemonList?.map((pokemon, index) => (
                <Draggable id={pokemon.id} key={pokemon.id}>
                  <PokemonDropListItem
                    pokemon={pokemon}
                    removePokemon={() => removePokemon(pokemon.id)}
                  />
                </Draggable>
              ))} */}
            </>
          ) : (
            <div className={styles.dropContainer}>
              <label>Dropzone {id}</label>
            </div>
          )}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};

export default Dropzone;
