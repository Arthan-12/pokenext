import { Dropdown } from 'react-bootstrap';
import { Pokemon } from '../../models/pokemon-model';

interface Props {
  pokemonList: Pokemon[];
}

function PokemonFilter({ pokemonList: [] }: Props) {
  return (
    <>
      <Dropdown className="d-inline mx-2" autoClose={false}>
        <Dropdown.Toggle variant="success" id="dropdown-autoclose-false">
          Filtrar por tipo
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#">Menu Item</Dropdown.Item>
          <Dropdown.Item href="#">Menu Item</Dropdown.Item>
          <Dropdown.Item href="#">Menu Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default PokemonFilter;
