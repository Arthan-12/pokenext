import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';

interface Props {
  pokemonType?: string;
  display?: 'horizontal' | 'vertical';
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
    } else if (pokemonType === 'grass' || pokemonType === 'bug') {
      currentBadgeColor = 'success';
    } else if (
      pokemonType === 'dragon' ||
      pokemonType === 'ground' ||
      pokemonType === 'steel'
    ) {
      currentBadgeColor = 'secondary';
    } else if (
      pokemonType === 'dark' ||
      pokemonType === 'rock' ||
      pokemonType === 'ghost'
    ) {
      currentBadgeColor = 'dark';
    } else if (pokemonType === 'electric' || pokemonType === 'fighting') {
      currentBadgeColor = 'warning';
    } else {
      currentBadgeColor = 'primary';
    }
    return setBadgeColor(currentBadgeColor);
  };
  return (
    <>
      <Badge
        bg={badgeColor}
        style={{ margin: '0.5rem', textTransform: 'uppercase' }}
      >
        {pokemonType}
      </Badge>
    </>
  );
};

export default PokemonTypeBadge;
