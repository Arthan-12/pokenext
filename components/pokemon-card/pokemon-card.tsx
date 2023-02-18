import { Card } from 'react-bootstrap';
import { Pokemon } from '../../models/pokemon-model';
import PokemonTypeBadge from '../pokemon-type-badge/pokemon-type-badge';
import styles from './pokemon-card.module.css';

interface Props {
  pokemon?: Pokemon;
  selected?: boolean;
  onClick: (params?: any) => void;
}

const PokemonCard: React.FC<Props> = ({
  pokemon = null,
  selected = false,
  onClick,
}) => {
  const handleFunctionCalls = () => {
    onClick();
  };

  return (
    <Card
      bg="light"
      text="primary"
      autoCapitalize="true"
      style={{ width: '18rem' }}
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={handleFunctionCalls}
    >
      <Card.Img variant="top" src={pokemon!.sprites?.front_default} />
      <Card.Header>
        <Card.Title
          style={{ textAlign: 'center', textTransform: 'capitalize' }}
        >
          {pokemon!.name}
        </Card.Title>
      </Card.Header>
      <Card.Footer style={{ display: 'flex', justifyContent: 'center' }}>
        {pokemon!.types?.map((pokemonType, index) => (
          <PokemonTypeBadge
            key={index}
            pokemonType={pokemonType.type.name}
          ></PokemonTypeBadge>
        ))}
      </Card.Footer>
    </Card>
  );
};

export default PokemonCard;
