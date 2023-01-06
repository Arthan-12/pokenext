import { Pokemon } from '../../models/pokemon-model';
import Image from 'next/image';
import styles from './pokemon-drop-list-item.module.css';
import PokemonTypeBadge from '../pokemon-type-badge/pokemon-type-badge';

interface Props {
  pokemon: Pokemon;
}

const PokemonDropListItem: React.FC<Props> = ({ pokemon = null }) => {
  return (
    <>
      <div className={styles.container}>
        <img
          width={90}
          height={90}
          src={pokemon?.sprites?.front_default}
          alt="pokemon-sprite"
        />
        <div className={styles.content}>
          <label className={styles.label}>
            {pokemon?.name} - {pokemon?.order}
          </label>
          <div className={styles.typeContainer}>
            {pokemon!.types?.map((pokemonType, index) => (
              <PokemonTypeBadge
                key={index}
                pokemonType={pokemonType.type.name}
              ></PokemonTypeBadge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDropListItem;
