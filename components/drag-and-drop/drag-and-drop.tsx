import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { textSpanEnd } from 'typescript';
import { Pokemon } from '../../models/pokemon-model';
import PokemonDropListItem from '../pokemon-drop-list-item/pokemon-drop-list-item';

interface Props {
  pokemonSquad: Pokemon[];
  updatedPokemonList?: (pokemonList: Pokemon[]) => void;
}

const DragAndDrop: React.FC<Props> = ({ pokemonSquad, updatedPokemonList }) => {
  const defaultPokemonList: Pokemon[] = [];
  // React state to track order of items
  const [itemList, setItemList] = useState(pokemonSquad);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const removePokemon = (id: number) => {
    const filteredPokemonList: Pokemon[] = itemList.filter(
      (pokemon) => pokemon.id !== id
    );
    setItemList(filteredPokemonList);
    updatedPokemonList(filteredPokemonList);
  };

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleDrop}>
        {isBrowser && pokemonSquad ? (
          <Droppable droppableId="list-container">
            {(provided) => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {itemList?.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.name}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="item-container"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <PokemonDropListItem
                          pokemon={item}
                          removePokemon={() => removePokemon(item.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : null}
      </DragDropContext>
    </div>
  );
};

export default DragAndDrop;
