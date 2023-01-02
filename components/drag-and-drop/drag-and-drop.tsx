import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Pokemon } from '../../models/pokemon-model';
import PokemonDropListItem from '../pokemon-drop-list-item/pokemon-drop-list-item';

interface Props {
  pokemonSquad: Pokemon[];
}

const DragAndDrop: React.FC<Props> = ({ pokemonSquad = [] }) => {
  const defaultPokemonList: Pokemon[] = [];
  // React state to track order of items
  const [itemList, setItemList] = useState(defaultPokemonList);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    setItemList(pokemonSquad);
  }, []);

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
        {isBrowser ? (
          <Droppable droppableId="list-container">
            {(provided) => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {itemList.map((item, index) => (
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
                        {/* {item.name} */}
                        <PokemonDropListItem pokemon={item} />
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
