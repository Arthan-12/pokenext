import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';

interface Props {
  pokemonType?: string;
}

const PokemonTypeBadge: React.FC<Props> = ({ pokemonType = '' }) => {
  const [badgeColor, setBadgeColor] = useState('warning');

  useEffect(() => {
    getBadgeColor();
  });

  const getBadgeColor = () => {
    let currentBadgeColor = 'info';
    if (pokemonType === 'psychic' || pokemonType === 'poison') {
      currentBadgeColor = 'primary';
    } else if (pokemonType === 'fire') {
      currentBadgeColor = 'danger';
    } else if (pokemonType === 'water' || pokemonType === 'ice') {
      currentBadgeColor = 'info';
    } else if (pokemonType === 'grass') {
      currentBadgeColor = 'success';
    } else if (pokemonType === 'dragon' || pokemonType === 'ground') {
      currentBadgeColor = 'secondary';
    } else if (pokemonType === 'dark' || pokemonType === 'rock') {
      currentBadgeColor = 'dark';
    } else if (pokemonType === 'electric' || pokemonType === 'fighting') {
      currentBadgeColor = 'warning';
    }
    return setBadgeColor(currentBadgeColor);
  };
  return (
    <>
      <Badge
        bg={badgeColor}
        style={{ margin: '1rem', textTransform: 'uppercase' }}
      >
        {pokemonType}
      </Badge>
    </>
  );
};

export default PokemonTypeBadge;
